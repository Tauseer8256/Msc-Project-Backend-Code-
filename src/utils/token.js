const jwt = require('jsonwebtoken'); // [1]
const { JWT_SECRET_KEY } = require('../utils/secrets');

const generate = (id) => jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '1d'});

// const generate = (id) => {
//     console.log("JWT_SECRET_KEY ===", JWT_SECRET_KEY, id);
//     return jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '1d'});
// }

const decode = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    generate,
    decode
}
// [1] "jsonwebtoken." npm, 2024. [Online]. Available: https://www.npmjs.com/package/jsonwebtoken. [Accessed: April 21, 2024].