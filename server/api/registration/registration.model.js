'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegistrationSchema = new _mongoose2.default.Schema({
  event: String,
  userid: String }, {
  usePushEach: true
});

exports.default = _mongoose2.default.model('Registration', RegistrationSchema);
//# sourceMappingURL=registration.model.js.map
