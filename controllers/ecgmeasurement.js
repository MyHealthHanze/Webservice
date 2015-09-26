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
    ECGMeasurements
        .create(req.body)
        .then(() => {
            return response('', 'The ECG measurements have been uploaded.', res);
        });
});

export default router;