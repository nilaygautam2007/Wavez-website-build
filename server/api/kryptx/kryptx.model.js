'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KryptxSchema = new _mongoose2.default.Schema({
  id: String,
  userid: String,
  answer: String
}, {
  timestamps: true
}, {
  usePushEach: true
});

exports.default = _mongoose2.default.model('Kryptx', KryptxSchema);
//# sourceMappingURL=kryptx.model.js.map
