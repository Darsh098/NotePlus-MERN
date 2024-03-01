const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create A User Using: POST "api/auth/". Doesn't Require Authentication
router.post('/', (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(() => {
            res.send("OK")
        })
        .catch(err => {
            res.send("NOT OK: " + err)
        });
})

module.exports = router