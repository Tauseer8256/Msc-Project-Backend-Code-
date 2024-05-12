const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

exports.signup = (req, res) => { // function to signup user on website
    const { firstname, lastname, language, email, password } = req.body;
    const hashedPassword = hashPassword(password.trim()); // generate plain text password hash

    const user = new User(firstname.trim(), lastname.trim(), language.trim(), email.trim(), hashedPassword);

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const token = generateToken(data.id); // generate jwt token for auth
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            });
        }
    });
};

exports.signin = (req, res) => { // function to signin user on website
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {  // function to compare user password during signin
                const token = generateToken(data.id); // generate jwt token for auth
                res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        language: data.language,
                        email: data.email
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

};