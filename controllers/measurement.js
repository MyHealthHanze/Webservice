import express from 'express';
var router = express.Router();

import models from '../models/index';
import auth from '../helpers/auth';
import response from '../helpers/response';

/**
 * Deletes a specific measurement of a specific type
 */
router.delete('/:type', auth.isAuthenticated, (req, res) => {
    var type = req.params.type;
    var measurementId = req.body.id;
    var model = undefined;

    // Check if the id has been given
    if (measurementId == null || measurementId == '')
        return response('You didn\'t supply a measurement id!', '', res);

    // Select a model to perform the destroy request on, otherwise give an error
    switch (type) {
        case "pulse":
            model = models.PulseMeasurements;
            break;
        case "bloodpressure":
            model = models.BloodPressureMeasurements;
            break;
        case "ecg":
            model = models.ECGMeasurements;
            break;
        default:
            return response('Not Found', '', res, 404);
            break;
    }

    // Actually delete the measurement
    model
        .destroy({
            where: {
                id: measurementId,
                userId: req.user.id
            }
        })
        .then(() => {
            return response('', 'The measurement has been deleted!', res);
        });
});

export default router;