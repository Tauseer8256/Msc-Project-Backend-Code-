const mysql = require('mysql'); // [1]
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../utils/secrets');

// mysql direct connection
// const connection = mysql.createConnection({
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASS,
//     database: DB_NAME,
//     port: 3306,
//     timeout: 2880  // Timeout in milliseconds (e.g., 60 seconds)
// });

// connection.connect((err) => {
//     if (err) console.log(err.message);
//     else console.log('Database connected')
// });

// module.exports = connection;

// mysql pooling connection, so database connection does not drop
const pool = mysql.createPool({
    connectionLimit: 10, // Maximum number of connections in the pool
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: 3306,
    // timeout: 2880  // Timeout in milliseconds (e.g., 60 seconds)
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error getting connection from pool:', err);
        return;
    }
    console.log('Database connected');
});

module.exports = pool;
// [1] MySQL, "MySQL Node.js Driver," GitHub. [Online]. Available: https://github.com/mysqljs/mysql.