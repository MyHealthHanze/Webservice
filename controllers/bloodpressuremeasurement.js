import express from 'express';
var router = express.Router();

import models from '../models/index';
import auth from '../helpers/auth';
import response from '../helpers/response';

var BloodPressureMeasurements = models.BloodPressureMeasurements;

/**
 * Returns the latest blood pressure measurements
 */
router.get('/', auth.isAuthenticated, (req, res) => {
    BloodPressureMeasurements
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
 * Creates a measurement of blood pressure values
 */
router.post('/', auth.isAuthenticated, (req, res) => {
    var measurement;

    try {
        // Parse the measurementValue
        var measurementValue = JSON.parse(req.body.measurementValue);

        // Build the measurement object
        measurement = {
            userId: req.user.id,
            systolicValue: measurementValue[0],
            diastolicValue: measurementValue[1],
            measurementDate: req.body.measurementDate
        };
    } catch (e) {
        return response('Something went wrong, please try again!', '', res);
    }

    // Create the blood pressure measurement and return the inserted id
    BloodPressureMeasurements
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