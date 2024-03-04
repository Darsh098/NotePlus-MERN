const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.SECRET;

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please Authenticate Using A Valid Token' })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        // Setting a User in req by getting a user from JWT
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Please Authenticate Using A Valid Token' })
    }

}

module.exports = fetchuser;