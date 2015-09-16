var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var models = require('../models/index');
var auth = require('../helpers/auth');

var Users = models.Users;

/**
 * Checks the user's credentials and supplies a token if credentials are valid
 */
router.post('/login', function(req, res) {
    // Check if the email and password are given
    if (req.body.email == undefined || req.body.password == undefined) {
        return res.status(401).json({
            error: 'Invalid credentials',
            result: ''
        });
    }

    // Try to find the user
    Users.find({ where: { email: req.body.email }})
        .then(function(user) {
            if (!user) {
                return res.status(401).json({
                    error: { email: 'Incorrect email' },
                    result: ''
                });
            }

            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                if (!isMatch) {
                    // TODO: Log the wrong password attempt

                    return res.status(401).json({
                        error: { password: 'Incorrect password' },
                        result: ''
                    });
                }

                // TODO: Check if the user account is disabled

                // TODO: Check if its the users first login

                user.password = '';

                var token = auth.createToken(user);

                return res.json({
                    token: token,
                    user: user
                });
            });
        });
});

module.exports = router;