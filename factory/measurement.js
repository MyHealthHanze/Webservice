import models from '../models/index';

/**
 *
 */
class MeasurementFactory {

    /**
     * Returns the ORM model for the type of measurement
     *
     * @param type
     * @returns {*}
     */
    getModel(type) {
        // Select a model to perform the destroy request on, otherwise return null
        switch (type) {
            case "pulse":
                return models.PulseMeasurements;
            case "bloodpressure":
                return models.BloodPressureMeasurements;
            case "ecg":
                return models.ECGMeasurements;
            default:
                return null;
        }
    }

    /**
     * Transforms the result of a query if necessary
     *
     * @param type
     * @param measurements
     * @returns {*}
     */
    getTransformation(type, measurements) {
        switch (type) {
            case "ecg":
                // Transform every measurementValue into a JSON object
                measurements.forEach((entry) => {
                    entry.measurementValue = JSON.parse(entry.measurementValue);
                });
                return measurements;
            default:
                return measurements;
        }
    }

    /**
     * Builds a measurement object for insertion into the database
     *
     * @param type
     * @param req
     * @returns {*}
     */
    getMeasurement(type, req) {
        try {
            // Check if measurementDate and measurementValue are set
            if (req.body.measurementDate == null || req.body.measurementValue == null)
                return null;

            // Build the base measurement object
            var measurement = {
                userId: req.user.id,
                measurementDate: req.body.measurementDate
            };

            switch (type) {
                case "pulse":
                    measurement['measurementValue'] = req.body.measurementValue;
                    return measurement;
                case "bloodpressure":
                    // Parse the measurementValue
                    var measurementValue = JSON.parse(req.body.measurementValue);

                    // Set the systolic and diastolic values with the values from the array
                    measurement['systolicValue'] = measurementValue[0];
                    measurement['diastolicValue'] = measurementValue[1];

                    return measurement;
                case "ecg":
                    // Try to parse JSON to see if it is valid
                    JSON.parse(req.body.measurementValue);
                    measurement['measurementValue'] = req.body.measurementValue;
                    return measurement;
                default:
                    return null;
            }
        } catch (e) {
            return null;
        }
    }

}

export default MeasurementFactory;