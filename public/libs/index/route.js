'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mobileDetect = require('mobile-detect');

var _mobileDetect2 = _interopRequireDefault(_mobileDetect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  var md = new _mobileDetect2.default(req.headers['user-agent']);
  console.log(md.mobile());
  // console.log( md.phone() );
  // console.log( md.tablet() );
  // console.log( md.userAgent() );

  if (md.mobile()) {
    res.sendFile('/phone.html', { root: __dirname });
  } else {
    res.sendFile('/index.html', { root: __dirname });
  }
});

module.exports = router;