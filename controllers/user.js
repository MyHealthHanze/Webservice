var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var models = require('../models/index');
var settings = require('../config/settings');
var auth = require('../helpers/auth');

var Users = models.Users;

/**
 * Checks the user's credentials and supplies a token if credentials are valid
 */
router.post('/login', function (req, res) {
    // Check if the email and password are given
    if (req.body.email == undefined || req.body.password == undefined) {
        return res.status(401).json({
            error: 'Invalid credentials',
            result: ''
        });
    }

    // Try to find the user
    Users.find({where: {email: req.body.email}})
        .then(function (user) {
            // Check if the user exists
            if (!user) {
                return res.status(401).json({
                    error: 'Incorrect email',
                    result: ''
                });
            }

            // Check if the user has been disabled
            if (user.disabled) {
                return res.status(401).json({
                    error: 'Your account has been disabled',
                    result: ''
                });
            }

            bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                if (!isMatch) {
                    // Update the amountOfFailedLoginAttempts when the login failed
                    var newAmountOfFailedLoginAttempts = user.amountOfFailedLoginAttempts + 1;
                    var accountIsDisabled = false;
                    if (newAmountOfFailedLoginAttempts >= settings.numberOfAttemptsBeforeDisable) {
                        accountIsDisabled = true;
                    }

                    Users.update({
                        amountOfFailedLoginAttempts: newAmountOfFailedLoginAttempts,
                        disabled: accountIsDisabled
                    }, {
                        where: { id: user.id }
                    });

                    var attemptsLeft = settings.numberOfAttemptsBeforeDisable - newAmountOfFailedLoginAttempts;

                    return res.status(401).json({
                        error: 'Incorrect password, ' + attemptsLeft + ' attempts left.',
                        result: ''
                    });
                }

                // Reset the amountOfFailedLoginAttempts when the user has that attribute set
                if (user.amountOfFailedLoginAttempts > 0) {
                    Users.update({
                        amountOfFailedLoginAttempts: 0,
                        disabled: 0
                    }, {
                        where: { id: user.id }
                    });
                }

                // Unset the password so users don't get to see it
                user['password'] = undefined;

                // Create a JSON Web Token
                var token = auth.createToken(user);

                var response = {
                    token: token,
                    user: user
                };

                if (!user.changedPassword) {
                    response.changePassword = true;
                }

                return res.json(response);
            });
        });
});

/**
 * Route to get the current user object
 */
router.get('/', auth.isAuthenticated, function(req, res) {
    return res.json({
        error: '',
        result: req.user
    });
});

module.exports = router;