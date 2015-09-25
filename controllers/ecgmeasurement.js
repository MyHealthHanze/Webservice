var express = require('express');
var router = express.Router();

var models = require('../models/index');
var auth = require('../helpers/auth');

var ECGMeasurements = models.ECGMeasurements;

/**
 * Returns the latest ECG measurements
 *
 * TODO: needs to be refined how much/what information we want to send
 */
router.get('/', auth.isAuthenticated, function (req, res) {
    ECGMeasurements
        .findAll({
            where: {
                userId: req.user.id
            }
        })
        .then(function (measurements) {
            if (measurements == null) {
                return res.status(401).json({
                    error: 'No measurements are available!',
                    result: ''
                });
            }

            return res.json({
                error: '',
                result: measurements
            })
        });
});

/**
 * Creates a measurement of ECG values
 *
 * TODO: Define the specific fields for every measurement
 */
router.post('/', auth.isAuthenticated, function (req, res) {
    ECGMeasurements
        .create(req.body)
        .then(function () {
            return res.json({
                error: '',
                result: 'The ECG measurements have been uploaded.'
            });
        });
});

module.exports = router;