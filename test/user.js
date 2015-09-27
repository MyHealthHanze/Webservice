var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../config/settings');

var url = config.baseUrl;
var jwtToken = undefined;

describe('Login controller', function () {

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

    describe('POST /user/login:', function () {
        var endpoint = 'user/login';

        it('should return error trying to login without an email', function (done) {
            var user = {
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
                    // Status code should match with 401 (Unauthorized)
                    res.status.should.equal(401);

                    // Error object should be present
                    should.exist(res.body.error);

                    // Error object should not be empty
                    res.body.error.should.not.equal('');

                    done();
                });
        });

        it('should return error trying to login without a password', function (done) {
            var body = {
                email: 'johnbakker@gmail.com'
            };
            request(url)
                .post(endpoint)
                .send(body)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // Status code should match with 401 (Unauthorized)
                    res.status.should.equal(401);

                    // Error object should be present
                    should.exist(res.body.error);

                    // Error object should not be empty
                    res.body.error.should.not.equal('');

                    done();
                });
        });

        it('should return error trying to login with incorrect password', function (done) {
            var body = {
                email: 'johnbakker@gmail.com',
                password: 'blablabla'
            };
            request(url)
                .post(endpoint)
                .send(body)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // Status code should match with 401 (Unauthorized)
                    res.status.should.equal(401);

                    // Error object should be present
                    should.exist(res.body.error);

                    // Error object should not be empty
                    res.body.error.should.not.equal('');

                    done();
                });
        });

        it('should return error trying to login with incorrect email', function (done) {
            var body = {
                email: 'johnbakker123@gmail.com',
                password: 'test'
            };
            request(url)
                .post(endpoint)
                .send(body)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // Status code should match with 401 (Unauthorized)
                    res.status.should.equal(401);

                    // Error object should be present
                    should.exist(res.body.error);

                    // Error object should not be empty
                    res.body.error.should.not.equal('');

                    done();
                });
        });

        it('should return token and user object when trying to login with valid credentials', function (done) {
            var body = {
                email: 'johnbakker@gmail.com',
                password: 'test'
            };
            request(url)
                .post(endpoint)
                .send(body)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // Status code should match with 200 (Success)
                    res.status.should.equal(200);

                    // Token object should be present
                    should.exist(res.body.token);
                    // User object should be present
                    should.exist(res.body.user);


                    // Error object should not be empty
                    res.body.user.should.not.equal('');
                    // Error object should not be empty
                    res.body.token.should.not.equal('');

                    done();
                });
        });

        it('should return an error when trying to login with a disabled account', function (done) {
            var body = {
                email: 'pieterjan@gmail.com',
                password: 'test'
            };
            request(url)
                .post(endpoint)
                .send(body)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // Status code should match with 401
                    res.status.should.equal(401);

                    // Error object should be present
                    should.exist(res.body.error);

                    // Error object should not be empty
                    res.body.error.should.not.equal('');

                    done();
                });
        });

        it('should return an changePassword response on first login ', function (done) {
            var body = {
                email: 'johnbakker@gmail.com',
                password: 'test'
            };
            request(url)
                .post(endpoint)
                .send(body)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    // Error object should be present
                    should.exist(res.body.changePassword);

                    done();
                });
        });
    });

    describe('POST /user/password:', function () {
        var endpoint = 'user/password';

        it('should return error trying to login without input', function (done) {
            request(url)
                .put(endpoint)
                .set('Authorization', 'Bearer ' + jwtToken)
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    // Status code should match with 401 (Unauthorized)
                    res.status.should.equal(401);

                    // Error object should be present
                    should.exist(res.body.error);

                    // Error object should not be empty
                    res.body.error.should.not.equal('');

                    done();
                });
        });

        it('should return error trying to login with wrong password', function (done) {
            var passwords = {
                old_password: 'testwrongpassword',
                new_password: 'test'
            };

            request(url)
                .put(endpoint)
                .set('Authorization', 'Bearer ' + jwtToken)
                .send(passwords)
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // Status code should match with 401 (Unauthorized)
                    res.status.should.equal(401);

                    // Error object should be present
                    should.exist(res.body.error);

                    // Error object should not be empty
                    res.body.error.should.not.equal('');

                    done();
                });
        });

        it('should return success when changing password with valid credentials', function (done) {
            var passwords = {
                old_password: 'test',
                new_password: 'test123'
            };

            // Try to change to password from test to test123
            request(url)
                .put(endpoint)
                .set('Authorization', 'Bearer ' + jwtToken)
                .send(passwords)
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // Status code should match with 200
                    res.status.should.equal(200);

                    // Result object should be present
                    should.exist(res.body.result);

                    // Result object should not be empty
                    res.body.result.should.not.equal('');

                    // Test if the password has actually changed
                    request(url)
                        .post('user/login')
                        .send({
                            email: 'johnbakker@gmail.com',
                            password: 'test123'
                        })
                        // end handles the response
                        .end(function (err, res) {
                            if (err) {
                                throw err;
                            }
                            // Status code should match with 401 (Unauthorized)
                            res.status.should.equal(200);

                            // Token object should be present
                            should.exist(res.body.token);

                            // Token object should not be empty
                            res.body.token.should.not.equal('');

                            var passwords = {
                                old_password: 'test123',
                                new_password: 'test'
                            };

                            // Change the password back to test
                            request(url)
                                .put(endpoint)
                                .set('Authorization', 'Bearer ' + jwtToken)
                                .send(passwords)
                                // end handles the response
                                .end(function (err, res) {
                                    if (err) {
                                        throw err;
                                    }
                                    // Status code should match with 200
                                    res.status.should.equal(200);

                                    // Result object should be present
                                    should.exist(res.body.result);

                                    // Result object should not be empty
                                    res.body.result.should.not.equal('');

                                    done();
                                });
                        });
                });
        });

    });

});