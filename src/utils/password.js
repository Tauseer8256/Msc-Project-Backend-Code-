const bcrypt = require('bcryptjs'); // [1]

const hash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // Hash a plain text password using bcrypt with a salt factor of 10

const compare = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword); // Compare a plain text password with its hashed counterpart using bcrypt

module.exports = {
    hash,
    compare
}

// [1] "bcryptjs." npm, 2024. [Online]. Available: https://www.npmjs.com/package/bcryptjs. [Accessed: May 12, 2024].