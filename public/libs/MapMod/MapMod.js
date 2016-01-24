define(["exports", "esri/Map", "esri/views/SceneView", "dojo/dom", "dojo/domReady!"], function (exports, _Map, _SceneView, _dom) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.MapMod = undefined;

  var _Map2 = _interopRequireDefault(_Map);

  var _SceneView2 = _interopRequireDefault(_SceneView);

  var _dom2 = _interopRequireDefault(_dom);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var MapMod = exports.MapMod = function () {
    function MapMod(viewDiv) {
      _classCallCheck(this, MapMod);

      this.viewDiv = viewDiv;
    }

    _createClass(MapMod, [{
      key: "start",
      value: function start() {
        var map = new _Map2.default({
          basemap: "streets"
        });
        var view = new _SceneView2.default({
          container: this.viewDiv,
          map: map,
          scale: 50000000,
          center: [-101.17, 21.78]
        });
      }
    }]);

    return MapMod;
  }();

  exports.default = MapMod;
});