import express from 'express';
var router = express.Router();

import MeasurementFactory from '../factory/measurement';
import auth from '../helpers/auth';
import response from '../helpers/response';


/**
 * Returns the users measurements
 */
router.get('/:type', auth.isAuthenticated, (req, res) => {
    var type = req.params.type;

    // Create a factory and get the model
    var factory = new MeasurementFactory();
    var model = factory.getModel(type);

    // Check if the model has been found, otherwise throw a 404
    if (model == null)
        return response('Not Found', '', res, 404);

    model
        .findAll({
            where: {
                userId: req.user.id
            }
        })
        .then((measurements) => {
            // Transform the measurement if necessary
            measurements = factory.getTransformation(type, measurements);

            return response('', measurements, res);
        });
});


/**
 * Creates a measurement of pulse values
 */
router.post('/:type', auth.isAuthenticated, (req, res) => {
    var type = req.params.type;

    // Create a factory and get the model
    var factory = new MeasurementFactory();
    var model = factory.getModel(type);

    // Check if the model has been found, otherwise throw a 404
    if (model == null)
        return response('Not Found', '', res, 404);

    // Get the measurement object
    var measurement = factory.getMeasurement(type, req);

    if (measurement == null)
        return response('Something went wrong, please try again!', '', res);

    // Create the pulse measurement and return the inserted id
    model
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


/**
 * Deletes a specific measurement of a specific type
 */
router.delete('/:type', auth.isAuthenticated, (req, res) => {
    var type = req.params.type;
    var measurementId = req.body.id;

    // Check if the id has been given
    if (measurementId == null || measurementId == '')
        return response('You didn\'t supply a measurement id!', '', res);

    // Create a factory and get the model
    var factory = new MeasurementFactory();
    var model = factory.getModel(type);

    // Check if the model has been found, otherwise throw a 404
    if (model == null)
        return response('Not Found', '', res, 404);

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