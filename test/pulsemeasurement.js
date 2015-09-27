var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/settings');

var url = config.baseUrl;
var jwtToken = undefined;

describe('Pulse measurement controller', function () {

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

    describe('GET /measurement/pulse:', function () {
        var endpoint = 'measurement/pulse';

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

                    done();
                });
        });

    });

    describe('POST /measurement/pulse:', function () {
        var endpoint = 'measurement/pulse';

        before(function (done2) {
            var measurement = {
                measurementDate: '2015-09-27T11:52:16.000Z'
            };

            request(url)
                .post(endpoint)
                .send(measurement)
                .set('Authorization', 'Bearer ' + jwtToken)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    done2();
                })
        });

        it('should return an array with two item when one is added', function (done) {

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
                    res.body.result.should.have.lengthOf(2);

                    // Results should be from the current userId
                    res.body.result[1].userId.should.equal(1);

                    done();
                });
        });
    })

});