import express from 'express';
var router = express.Router();

import models from '../models/index';
import auth from '../helpers/auth';
import response from '../helpers/response';

var ECGMeasurements = models.ECGMeasurements;

/**
 * Returns the latest ECG measurements
 */
router.get('/', auth.isAuthenticated, (req, res) => {
    ECGMeasurements
        .findAll({
            where: {
                userId: req.user.id
            }
        })
        .then((measurements) => {
            // Transform every measurementValue into a JSON object
            measurements.forEach((entry) => {
                entry.measurementValue = JSON.parse(entry.measurementValue);
            });

            return response('', measurements, res);
        });
});

/**
 * Creates a measurement of ECG values
 */
router.post('/', auth.isAuthenticated, (req, res) => {
    // Build the measurement object
    var measurement = {
        userId: req.user.id,
        measurementValue: req.body.measurementValue,
        measurementDate: req.body.measurementDate
    };

    // Create the ECG measurement and return the inserted id
    ECGMeasurements
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