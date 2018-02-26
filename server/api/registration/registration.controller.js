/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/registrations              ->  index
 * POST    /api/registrations              ->  create
 * GET     /api/registrations/:id          ->  show
 * PUT     /api/registrations/:id          ->  update
 * DELETE  /api/registrations/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _registration = require('./registration.model');

var _registration2 = _interopRequireDefault(_registration);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function saveUpdates(updates) {
  return function (entity) {
    if (entity) {
      var updated = _lodash2.default.merge(entity, updates);
      return updated.save().then(function (updated) {
        return updated;
      });
    }
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Registrations
function index(req, res) {
  return _registration2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Registration from the DB
function show(req, res) {
  return _registration2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Registration in the DB
function create(req, res) {
  _user2.default.findById(req.user.id).exec().then(function (user) {
    user.events.push(req.body.event);
    user.save();
  });
  return _registration2.default.create({ event: req.body.event, userid: req.user.id }).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Registration in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _registration2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Registration from the DB
function destroy(req, res) {
  return _registration2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=registration.controller.js.map
