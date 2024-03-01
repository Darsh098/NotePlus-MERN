const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Create A User Using: POST "api/auth/". Login Isn't Required
router.post('/', [
    body("name", "Enter A Valid Name").isLength({ min: 3 }),
    body("email", "Enter A Valid Email").isEmail(),
    body("password", "Password Must Be Atleast 5 Characters").isLength({ min: 5 })], async (req, res) => {

        try {
            // If There Are Errors Return Bed Request And The Errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Setting Value In Instance Of User Model
            const newUser = new User({
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                password: hashedPassword
            });

            // Check Whether The User With The Same Email Exists Already
            let user = await User.findOne({ email: req.body.email.toLowerCase() });
            if (user) {
                return res.status(400).json({ error: "User Alerady Exists With This Email" });
            }

            // Creating A New User
            user = await newUser.save();
            res.json(user);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send("Some Error Occured");
        }
    });

module.exports = router;