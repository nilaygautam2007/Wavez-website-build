/**
 * Registration model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _registration = require('./registration.model');

var _registration2 = _interopRequireDefault(_registration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegistrationEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
RegistrationEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _registration2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    RegistrationEvents.emit(event + ':' + doc._id, doc);
    RegistrationEvents.emit(event, doc);
  };
}

exports.default = RegistrationEvents;
//# sourceMappingURL=registration.events.js.map
