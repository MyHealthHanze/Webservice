var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/settings');

var url = config.baseUrl;
var jwtToken = undefined;

describe('Bills controller', function () {

    before(function (done) {
        var endpoint = 'user/login';

        var user = {
            email: 'johnbakker@gmail.com',
            password: 'test'
        };
        request(url)
            .post(endpoint)
            .send(user)
            // end handles the response
            .end(function (err, res) {
                if (err) {
                    throw err;
                }

                jwtToken = res.body.token;

                done();
            });
    });

    describe('GET /bills:', function () {
        var endpoint = 'bills';

        it('should return an array with one item', function (done) {
            request(url)
                .get(endpoint)
                .set('Authorization', 'Bearer ' + jwtToken)
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // Status code should match with 200 (Success)
                    res.status.should.equal(200);

                    // Result object should be present
                    should.exist(res.body.result);

                    // Check if the errors are empty
                    res.body.error.should.equal('');

                    // Result object should not be empty
                    res.body.result.should.not.equal('');

                    // Check if it has one result
                    res.body.result.should.have.lengthOf(1);

                    // Results should be from the current userId
                    res.body.result[0].userId.should.equal(1);

                    // Orders should be presents
                    should.exist(res.body.result[0].orders)

                    // Orders should have a length of 1
                    res.body.result[0].orders.should.have.lengthOf(1);

                    done();
                });
        });

    });

});