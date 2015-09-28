/**
 * Helper method to make writing responses way simpler
 *
 * @param error
 * @param result
 * @param res
 * @param statusCode
 * @returns {*}
 */
var response = (error, result, res, statusCode = 401) => {
    // Make a success response
    if (error == '') {
        return res.json({
            error: '',
            result: result
        });

    } else {
        // Make an error response
        return res.status(statusCode).json({
            error: error,
            result: ''
        });
    }
};

export default response;