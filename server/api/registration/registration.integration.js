'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newRegistration;

describe('Registration API:', function () {

  describe('GET /api/registrations', function () {
    var registrations;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/registrations').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        registrations = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      expect(registrations).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/registrations', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/registrations').send({
        name: 'New Registration',
        info: 'This is the brand new registration!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newRegistration = res.body;
        done();
      });
    });

    it('should respond with the newly created registration', function () {
      expect(newRegistration.name).to.equal('New Registration');
      expect(newRegistration.info).to.equal('This is the brand new registration!!!');
    });
  });

  describe('GET /api/registrations/:id', function () {
    var registration;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/registrations/' + newRegistration._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        registration = res.body;
        done();
      });
    });

    afterEach(function () {
      registration = {};
    });

    it('should respond with the requested registration', function () {
      expect(registration.name).to.equal('New Registration');
      expect(registration.info).to.equal('This is the brand new registration!!!');
    });
  });

  describe('PUT /api/registrations/:id', function () {
    var updatedRegistration;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/registrations/' + newRegistration._id).send({
        name: 'Updated Registration',
        info: 'This is the updated registration!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedRegistration = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedRegistration = {};
    });

    it('should respond with the updated registration', function () {
      expect(updatedRegistration.name).to.equal('Updated Registration');
      expect(updatedRegistration.info).to.equal('This is the updated registration!!!');
    });
  });

  describe('DELETE /api/registrations/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/registrations/' + newRegistration._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when registration does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/registrations/' + newRegistration._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=registration.integration.js.map
