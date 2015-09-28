import express from 'express';
var router = express.Router();

import models from '../models/index';
import auth from '../helpers/auth';
import response from '../helpers/response';

var ECGMeasurements = models.ECGMeasurements;

/**
 * Returns the latest ECG measurements
 *
 * TODO: needs to be refined how much/what information we want to send
 */
router.get('/', auth.isAuthenticated, (req, res) => {
    ECGMeasurements
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
 * Creates a measurement of ECG values
 *
 * TODO: Define the specific fields for every measurement
 */
router.post('/', auth.isAuthenticated, (req, res) => {
    // Set the userId to the current user
    req.body.userId = req.user.id;
    // Delete the id to prevent errors
    req.body['id'] = undefined;

    // Create the ECG measurement and return the inserted id
    ECGMeasurements
        .create(req.body, {
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