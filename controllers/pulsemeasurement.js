import express from 'express';
var router = express.Router();

import models from '../models/index';
import auth from '../helpers/auth';
import response from '../helpers/response';

var PulseMeasurements = models.PulseMeasurements;

/**
 * Returns the latest pulse measurements
 *
 * TODO: needs to be refined how much/what information we want to send
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
 *
 * TODO: Define the specific fields for every measurement
 */
router.post('/', auth.isAuthenticated, (req, res) => {
    // Set the userId to the current user
    req.body.userId = req.user.id;
    // Delete the id to prevent errors
    req.body['id'] = undefined;

    // Create the pulse measurement and return the inserted id
    PulseMeasurements
        .create(req.body, {
            plain: true,
            raw: true
        })
        .then((inserted) => {
            return response('', inserted.id, res);
        });
});

export default router;