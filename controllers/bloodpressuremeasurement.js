import express from 'express';
var router = express.Router();

import models from '../models/index';
import auth from '../helpers/auth';
import response from '../helpers/response';

var BloodPressureMeasurements = models.BloodPressureMeasurements;

/**
 * Returns the latest blood pressure measurements
 *
 * TODO: needs to be refined how much/what information we want to send
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
 *
 * TODO: Define the specific fields for every measurement
 */
router.post('/', auth.isAuthenticated, (req, res) => {
    BloodPressureMeasurements
        .create(req.body)
        .then(() => {
            return response('', 'The blood pressure measurements have been uploaded.', res);
        });
});

export default router;