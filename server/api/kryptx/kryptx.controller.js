/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/kryptxs              ->  index
 * POST    /api/kryptxs              ->  create
 * GET     /api/kryptxs/:id          ->  show
 * PUT     /api/kryptxs/:id          ->  update
 * DELETE  /api/kryptxs/:id          ->  destroy
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

var _kryptx = require('./kryptx.model');

var _kryptx2 = _interopRequireDefault(_kryptx);

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

// Gets a list of Kryptxs
function index(req, res) {
  return _kryptx2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Kryptx from the DB
function show(req, res) {
  return _kryptx2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Kryptx in the DB
function create(req, res) {
  _user2.default.findById(req.user.id).exec().then(function (user) {
    var flag = 1;
    for (var i = 0; i < user.events.length; ++i) {
      if (req.user.id == user.events[i]) {
        flag = 0;
      }
    }
    if (flag == 1) {
      user.events.push(req.body.id);
      user.save();
    }
  });
  return _kryptx2.default.create({ id: req.body.id, userid: req.user.id, answer: req.body.answer }).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Kryptx in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _kryptx2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Kryptx from the DB
function destroy(req, res) {
  return _kryptx2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=kryptx.controller.js.map
