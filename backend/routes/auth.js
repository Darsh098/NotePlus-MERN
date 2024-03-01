const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create A User Using: POST "api/auth/". Doesn't Require Authentication
router.post('/', [
    body("name", "Enter A Valid Name").isLength({ min: 3 }),
    body("email", "Enter A Valid Email").isEmail(),
    body("password", "Password Must Be Atleast 5 Characters").isLength({ min: 5 })
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save()
        .then(user => res.json(user))
        .catch(err => {
            console.log(err);
            res.json({ error: "Email Id Already Exists... Please Provide Unique Email Id...", message: err.message })
        })
})

module.exports = router