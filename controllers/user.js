var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var models = require('../models/index');
var auth = require('./auth');

var Users = models.users;

router.post('/login', function(req, res) {
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
                    return res.status(401).json({
                        error: { password: 'Incorrect password' },
                        result: ''
                    });
                }

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