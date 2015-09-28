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
    // Set the userId to the current user
    req.body.userId = req.user.id;
    // Delete the id to prevent errors
    req.body['id'] = undefined;

    // Create the blood pressure measurement and return the inserted id
    BloodPressureMeasurements
        .create(req.body, {
            plain: true,
            raw: true
        })
        .then((inserted) => {
            return response('', inserted.id, res);
        });
});

export default router;