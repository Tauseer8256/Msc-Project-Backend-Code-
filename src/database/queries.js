const { DB_NAME } = require('../utils/secrets')

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, NOW())
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

module.exports = {
    createNewUser,
    findUserByEmail
};