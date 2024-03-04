const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route 1: Get All The Notes Using: GET "api/notes/fetchnotes". Login Required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: Add A Note Using: POST "api/notes/fetchnotes". Login Required
router.post('/addnote', fetchuser, [
    body("title", "Title Can't Be Empty").notEmpty(),
    body("description", "Description Can't Be Empty").notEmpty(),
], async (req, res) => {
    try {
        // If There Are Errors Return Bed Request And The Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const newNote = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });
        const note = await newNote.save();
        res.json(note);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router