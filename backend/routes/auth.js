const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

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

            const newUser = new User({
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                password: req.body.password
            });

            // Check Whether The User With The Same Email Exists Already
            let user = await User.findOne({ email: req.body.email.toLowerCase() });
            if (user) {
                return res.status(400).json({ error: "User Alerady Exists With This Email" });
            }
            user = await newUser.save();
            res.json(user);
        }
        catch (err) {
            console.error(err.message);
        }
    });

module.exports = router;