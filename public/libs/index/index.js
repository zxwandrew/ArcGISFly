define(["libs/MapMod/MapMod"], function (_MapMod) {
  "use strict";

  var _MapMod2 = _interopRequireDefault(_MapMod);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var mapMod = new _MapMod2.default("viewDiv");
  mapMod.start();
});