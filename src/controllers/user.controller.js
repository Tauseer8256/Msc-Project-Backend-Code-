const User = require('../models/user.model');
const { hash: hashPassword } = require('../utils/password');

exports.updateUser = (req, res) => { // function to update user
    const { userId } = req.params; // Assuming userId is the identifier for the user to update
    const { firstname, lastname, language, email, password } = req.body;
    
    // Optional: Validate input fields if needed
    
    // Construct the update object
    const updateData = {};
    if (firstname) updateData.firstname = firstname.trim();
    if (lastname) updateData.lastname = lastname.trim();
    if (language) updateData.language = language.trim();
    if (email) updateData.email = email.trim();
    if (password) updateData.password = hashPassword(password.trim());
    
    // Update the user in the database
    User.update(userId, updateData, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: "success",
                data
            });
        }
    });
};

// Assuming you have a User model with appropriate methods for interacting with the database

exports.getTotalUsersCount = (req, res) => {
    // Get the total count of users from the database
    User.getTotalUsersCount((err, count) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: "success",
                totalUsersCount: count
            });
        }
    });
};

exports.getUsersList = (req, res) => {
    // Retrieve the list of users from the database
    User.getUsersList((err, users) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: "success",
                users: users
            });
        }
    });
};