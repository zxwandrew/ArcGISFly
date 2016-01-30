define(["exports", "dojo/dom", "dojo/on", "dojo/topic"], function (exports, _dom, _on, _topic) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.DeviceOrientationControls = undefined;

  var _dom2 = _interopRequireDefault(_dom);

  var _on2 = _interopRequireDefault(_on);

  var _topic2 = _interopRequireDefault(_topic);

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

  var DeviceOrientationControls = exports.DeviceOrientationControls = function () {
    function DeviceOrientationControls(object) {
      _classCallCheck(this, DeviceOrientationControls);

      this.scope = this;
      this.object = object;
      this.object.rotation.reorder("YXZ");

      this.enabled = true;

      this.deviceOrientation = {};
      this.screenOrientation = 0;

      this.orientationChangeHandle;
      this.onDeviceOrientationChangeHandle;

      this.connect();
    }

    _createClass(DeviceOrientationControls, [{
      key: "connect",
      value: function connect() {
        var _this = this;

        // this.onScreenOrientationChangeEvent(); // run once on load
        this.screenOrientation = window.orientation || 0;
        this.update();

        window.addEventListener('orientationchange', function () {
          _this.screenOrientation = window.orientation || 0;
          _this.update();
        }, false);
        window.addEventListener('deviceorientation', function (event) {
          _this.deviceOrientation = event;
          _this.update.call(_this.scope);
        }, false);

        this.enabled = true;
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        window.removeEventListener('orientationchange', this.onScreenOrientationChangeEvent, false);
        window.removeEventListener('deviceorientation', this.onDeviceOrientationChangeEvent, false);

        this.enabled = false;
      }
    }, {
      key: "update",
      value: function update() {
        if (this.enabled === false) return;

        var alpha = this.deviceOrientation.alpha ? THREE.Math.degToRad(this.deviceOrientation.alpha) : 0; // Z
        var beta = this.deviceOrientation.beta ? THREE.Math.degToRad(this.deviceOrientation.beta) : 0; // X'
        var gamma = this.deviceOrientation.gamma ? THREE.Math.degToRad(this.deviceOrientation.gamma) : 0; // Y''
        var orient = this.screenOrientation ? THREE.Math.degToRad(this.screenOrientation) : 0; // O

        // this.setObjectQuaternion( this.object.quaternion, alpha, beta, gamma, orient );
        var zee = new THREE.Vector3(0, 0, 1);
        var euler = new THREE.Euler();
        var q0 = new THREE.Quaternion();
        var q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));

        euler.set(beta, alpha, -gamma, 'YXZ'); // 'ZXY' for the device, but 'YXZ' for us
        this.object.quaternion.setFromEuler(euler); // orient the device
        this.object.quaternion.multiply(q1); // camera looks out the back of the device, not the top
        this.object.quaternion.multiply(q0.setFromAxisAngle(zee, -orient)); // adjust for screen orientation

        //send off to phone.js now
        var coords = { x: this.object.quaternion.x, y: this.object.quaternion.y, z: this.object.quaternion.z, w: this.object.quaternion.w, alpha: this.deviceOrientation.alpha, beta: this.deviceOrientation.beta, gamma: this.deviceOrientation.gamma, orient: this.screenOrientation };
        console.log(this.object.quaternion.x + ", " + this.object.quaternion.y + ", " + this.object.quaternion.z + ", " + this.object.quaternion.w + "," + this.deviceOrientation.gamma);

        _topic2.default.publish("coords", coords);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this.disconnect();
      }
    }]);

    return DeviceOrientationControls;
  }();

  exports.default = DeviceOrientationControls;
});