const express = require('express');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const aiRoute = require('./routes/ai.route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/ai', aiRoute);

app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "APP is working"
        }
    });
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});

module.exports = app;