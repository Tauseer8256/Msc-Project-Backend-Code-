const jwt = require('jsonwebtoken'); // [1]
const { JWT_SECRET_KEY } = require('../utils/secrets');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => { // calling verify function for token
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        if (!decoded.id) {
            return res.status(401).json({ message: 'User ID is missing in the token' });
        }
        req.userId = decoded.id; // Add userId to request object for later use
        next();
    });
};

module.exports = verifyToken;

// [1] "jsonwebtoken." npm, 2024. [Online]. Available: https://www.npmjs.com/package/jsonwebtoken. [Accessed: April 21, 2024].