var jwt = require('jwt-simple');
var moment = require('moment');

var settings = require('../config/settings');
var models = require('../models/index');
var response = require('../helpers/response');

var Users = models.Users;

module.exports = {

    createToken: function (user) {
        var payload = {
            exp: moment().add(settings.tokenExpiresInMinutes, 'minutes').unix(),
            iat: moment().unix(),
            sub: user.id
        };

        return jwt.encode(payload, settings.secret);
    },

    isAuthenticated: function (req, res, next) {
        // Check if the Authorization headers are set
        if (!(req.headers && req.headers.authorization))
            return response('You did not provide a JSON Web Token in the Authorization header.', '', res, 400);

        var header = req.headers.authorization.split(' ');
        var token = header[1];
        try {
            var payload = jwt.decode(token, settings.secret);
        } catch (err) {
            return response('The JSON Web Token is not in a valid format', '', res);
        }
        var now = moment().unix();

        if (now > payload.exp) {
            return response('Token has expired', '', res);
        }

        // Check if user exists and is not disabled
        Users.find({where: {id: payload.sub}})
            .then(function (user) {
                if (user == null)
                    return response('User no longer exists', '', res, 400);

                // Deletes the password from the user object
                user['password'] = undefined;

                req.user = user;
                next();
            });
    }
};