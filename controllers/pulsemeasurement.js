var express = require('express');
var router = express.Router();

var models = require('../models/index');
var auth = require('../helpers/auth');

var PulseMeasurements = models.PulseMeasurements;

/**
 * Returns the latest pulse measurements
 *
 * TODO: needs to be refined how much/what information we want to send
 */
router.get('/', auth.isAuthenticated, function (req, res) {
    PulseMeasurements
        .findAll({
            where: {
                userId: req.user.id
            }
        })
        .then(function (measurements) {
            if (measurements == null) {
                return res.status(401).json({
                    error: 'No pulse measurements are available!',
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
 * Creates a measurement of pulse values
 *
 * TODO: Define the specific fields for every measurement
 */
router.post('/', auth.isAuthenticated, function (req, res) {
    PulseMeasurements
        .create(req.body)
        .then(function () {
            return res.json({
                error: '',
                result: 'The pulse measurements have been uploaded.'
            });
        });
});

module.exports = router;