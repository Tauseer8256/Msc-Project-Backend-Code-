const mysql = require('mysql'); // [1]
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../utils/secrets');

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
});

connection.connect((err) => {
    if (err) console.log(err.message);
    else console.log('Database connected')
});

module.exports = connection;

// [1] MySQL, "MySQL Node.js Driver," GitHub. [Online]. Available: https://github.com/mysqljs/mysql.