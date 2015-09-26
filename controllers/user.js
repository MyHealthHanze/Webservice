import express from 'express';
var router = express.Router();
import bcrypt from 'bcryptjs';
import moment from 'moment';

import models from '../models/index';
import settings from '../config/settings';
import auth from '../helpers/auth';
import response from '../helpers/response';

var Users = models.Users;

/**
 * Checks the user's credentials and supplies a token if credentials are valid
 */
router.post('/login', (req, res) => {
    // Check if the email and password are given, otherwise return an error
    if (req.body.email == undefined || req.body.password == undefined)
        return response('Invalid credentials', '', res);

    // Try to find the user with the supplied email
    Users
        .find({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            // Check if the user exists, otherwise return an error
            if (!user)
                return response('Incorrect email', '', res);

            // Get the current utc time (same as the DB)
            var currentTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");

            // Get the disabledOn time and add the timeAccountDisabled amount of minutes to disabledOn and format it
            var disabledOn = moment(user.disabledOn).utc().add(settings.timeAccountDisabled, 'minutes').format("YYYY-MM-DD HH:mm:ss");

            // Check if the user has been disabled, compares the disabledOn time with the current time
            if (user.disabledOn != null && disabledOn >= currentTime)
                return response('Your account is disabled', '', res);

            // Compare the supplied password from the user with the real password
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {

                // Check if the passwords are matching
                if (!isMatch) {
                    // Update the amountOfFailedLoginAttempts when the login failed
                    var newAmountOfFailedLoginAttempts = user.amountOfFailedLoginAttempts + 1;
                    var disabledOn = undefined;

                    // If the amountOfFailedLoginAttempts goes over the limit, set disabledOn to the current time
                    if (newAmountOfFailedLoginAttempts >= settings.numberOfAttemptsBeforeDisable)
                        disabledOn = moment().format("YYYY-MM-DD HH:mm:ss");

                    // Make an object that contains the attributes that needs updating
                    var updatedUser = {
                        amountOfFailedLoginAttempts: newAmountOfFailedLoginAttempts,
                    };

                    // Set disabledOn if it's not undefined
                    if (disabledOn != undefined) {
                        updatedUser.disabledOn = disabledOn
                    }

                    // Update the user object with the amountOfFailedLoginAttempts or disabled(On)
                    Users
                        .update(updatedUser, {
                            where: {
                                id: user.id
                            }
                        });

                    return response('Incorrect password, limited login attempts left.', '', res);
                }

                // Reset the amountOfFailedLoginAttempts when the user has that attribute set
                if (user.amountOfFailedLoginAttempts > 0) {
                    var updatedUser = {
                        amountOfFailedLoginAttempts: 0,
                        disabledOn: null
                    };

                    Users
                        .update(updatedUser, {
                            where: {
                                id: user.id
                            }
                        });
                }

                // Unset the password so users don't get to see it
                user['password'] = undefined;

                // Create a JSON Web Token
                var token = auth.createToken(user);

                var successfulResponse = {
                    token: token,
                    user: user
                };

                // Set the an object in the JSON response that the user needs to change its password if its his first login
                if (!user.changedPassword)
                    successfulResponse.changePassword = true;

                return res.json(successfulResponse);
            });
        });
});

/**
 * Route to change the current users password
 */
router.put('/password', auth.isAuthenticated, (req, res) => {
    var oldPassword = req.body.old_password;
    var newPassword = req.body.new_password;

    // One or both passwords hasn't been supplied
    if (oldPassword == undefined || newPassword == undefined)
        return response('Invalid passwords', '', res);

    // Try to find the user
    Users
        .find({
            where: {
                id: req.user.id
            }
        })
        .then((user) => {
            // Check if the user exists (just in case)
            if (!user)
                return response('You are not logged in!', '', res);

            // Check if the given password is equal to the current password
            bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
                if (!isMatch)
                    return response('Your old password does not match your current one', '', res);

                // Create a new password with bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        // Make an object that contains the attributes that needs updating
                        var updatedUser = {
                            password: hash,
                            changedPassword: true
                        };

                        // Update the users password and updates changedPassword
                        Users
                            .update(updatedUser, {
                                where: {
                                    id: user.id
                                }
                            })
                            .then(() => {
                                return response('', 'Your password has been changed!', res);
                            });
                    });
                });
            });
        });
});

export default router;