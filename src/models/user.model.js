const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery } = require('../database/queries');

class User {
    constructor(firstname, lastname, langugae, email, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.langugae = langugae;
        this.email = email;
        this.password = password;
    }

    static create(newUser, cb) {
        db.query(createNewUserQuery, 
            [
                newUser.firstname, 
                newUser.lastname,
                newUser.langugae, 
                newUser.email, 
                newUser.password
            ], (err, res) => {
                if (err) {
                    console.log("create ====", err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    langugae: newUser.langugae,
                    email: newUser.email
                });
        });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                console.log(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static update(userId, updatedUserData, cb) {
        const updateUserQuery = `
            UPDATE users
            SET firstname = ?, lastname = ?, language = ?, email = ?, password = ?
            WHERE id = ?
        `;
        
        db.query(updateUserQuery, 
            [
                updatedUserData.firstname, 
                updatedUserData.lastname,
                updatedUserData.language, 
                updatedUserData.email, 
                updatedUserData.password,
                userId
            ], (err, res) => {
                if (err) {
                    console.log("update ====", err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: userId,
                    firstname: updatedUserData.firstname,
                    lastname: updatedUserData.lastname,
                    language: updatedUserData.language,
                    email: updatedUserData.email
                });
        });
    }    
}

module.exports = User;