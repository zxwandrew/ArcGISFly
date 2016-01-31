define(["exports", "esri/Map", "esri/views/SceneView", "dojo/dom", "esri/layers/ArcGISElevationLayer", "dojo/domReady!"], function (exports, _Map, _SceneView, _dom, _ArcGISElevationLayer) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.MapMod = undefined;

  var _Map2 = _interopRequireDefault(_Map);

  var _SceneView2 = _interopRequireDefault(_SceneView);

  var _dom2 = _interopRequireDefault(_dom);

  var _ArcGISElevationLayer2 = _interopRequireDefault(_ArcGISElevationLayer);

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
      this.previousSpeed = 0.01;
    }

    _createClass(MapMod, [{
      key: "start",
      value: function start() {
        this.map = new _Map2.default({
          basemap: "hybrid"
        });

        this.view = new _SceneView2.default({
          container: this.viewDiv,
          map: this.map,
          camera: {
            position: [7.654, 45.919, 2183],
            tilt: 90,
            fov: 120
          }
        });

        this.view.then(function (evt) {
          console.log("loaded");
          evt.navigation.rotate.begin([0, 0], 2);
        }, function (error) {
          console.log("error loading");
        });
      }
    }, {
      key: "rotate",
      value: function rotate(ScreenCoord, speed) {
        // this.view.navigation.rotate.update([ScreenCoord.x, ScreenCoord.y], 2);
        if (speed == 0) {
          if (this.previousSpeed == 0) {
            this.view.navigation.rotate.update([ScreenCoord.x, ScreenCoord.y], 2);
          } else {
            this.view.navigation.rotate.update([ScreenCoord.x, 0], 2);
            this.view.navigation.pan.endContinuous();
            this.view.navigation.pan.end(0, 0);
          }
        } else {
          this.view.navigation.rotate.update([ScreenCoord.x, ScreenCoord.y], 2);
          this.view.navigation.pan.beginContinuous(4);
          this.view.navigation.pan.updateContinuous(speed);
        }
        this.previousSpeed = speed;
      }
    }, {
      key: "pan",
      value: function pan() {
        this.view.navigation.pan.beginContinuous(4);
      }
    }, {
      key: "changeSpeed",
      value: function changeSpeed(speed) {
        this.view.navigation.pan.updateContinuous(speed);
      }
    }, {
      key: "stopPan",
      value: function stopPan() {
        this.view.navigation.pan.endContinuous();
      }
    }, {
      key: "changeElevation",
      value: function changeElevation(currentScreenCoord, elevationHeight) {
        this.view.navigation.pan._panMode = 1;
        this.view.navigation.pan.begin(currentScreenCoord);
        this.view.navigation.pan.update([currentScreenCoord[0], elevationHeight]);
        this.view.navigation.pan.end([currentScreenCoord[0], elevationHeight]);
        this.view.navigation.pan._panMode = 0;
      }
    }]);

    return MapMod;
  }();

  exports.default = MapMod;
});