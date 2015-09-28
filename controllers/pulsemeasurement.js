import express from 'express';
var router = express.Router();

import models from '../models/index';
import auth from '../helpers/auth';
import response from '../helpers/response';

var PulseMeasurements = models.PulseMeasurements;

/**
 * Returns the latest pulse measurements
 */
router.get('/', auth.isAuthenticated, (req, res) => {
    PulseMeasurements
        .findAll({
            where: {
                userId: req.user.id
            }
        })
        .then((measurements) => {
            return response('', measurements, res);
        });
});

/**
 * Creates a measurement of pulse values
 */
router.post('/', auth.isAuthenticated, (req, res) => {
    // Build the measurement object
    var measurement = {
        userId: req.user.id,
        measurementValue: req.body.measurementValue,
        measurementDate: req.body.measurementDate
    };

    // Create the pulse measurement and return the inserted id
    PulseMeasurements
        .create(measurement, {
            plain: true,
            raw: true
        })
        .then((inserted) => {
            // Build an object with callback ids
            var ids = {
                local_id: req.body.local_id,
                online_id: inserted.id
            };

            return response('', ids, res);
        });
});

export default router;