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

// Route 3: Update An Existing Note Using: PUT "api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create New Note Object
        const newNote = {};
        if (title)
            newNote.title = title;
        if (description)
            newNote.description = description;
        if (tag)
            newNote.tag = tag;

        // Find A Note To Be Updated And Update It
        let note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).send("Not Found");

        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Not Allowed");

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 4: Delete An Existing Note Using: DELETE "api/notes/deletenote". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find A Note To Be Delete And Delete It
        let note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).send("Not Found");

        // Allow Deletion Only If User Owns The Note
        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Not Allowed");

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note Has Been Deleted", note: note });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router