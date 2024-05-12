const express = require('express');
const cors = require('cors');
const authRoute = require('./src/routes/auth.route');
const userRoute = require('./src/routes/user.route');
const aiRoute = require('./src/routes/ai.route');
const app = express();

// Allow requests from all origins
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/ai', aiRoute);

app.get('/', (req, res) => {
    const os = require('os');

    // Get the network interfaces
    const networkInterfaces = os.networkInterfaces();

    // Iterate over each network interface
    let ip = undefined;
    Object.keys(networkInterfaces).forEach((interfaceName) => {
        const interfaces = networkInterfaces[interfaceName];
        interfaces.forEach((interfaceInfo) => {
            // Filter out IPv4 addresses and non-internal addresses
            if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
                console.log(`IP Address: ${interfaceInfo.address}`);
                ip = interfaceInfo.address;
            }
        });
    });

    res.status(200).send({
        status: "success",
        data: {
            message: "APP is working",
            ip
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

// In Express.js
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://e846-203-215-165-236.ngrok-free.app");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

module.exports = app;

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});
