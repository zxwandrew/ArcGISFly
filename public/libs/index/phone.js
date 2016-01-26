define(["dojo/dom", "dojo/on", "dojo/query", "dojo/_base/window", "dojo/touch"], function (_dom, _on, _query, _window, _touch) {
  "use strict";

  var _dom2 = _interopRequireDefault(_dom);

  var _on2 = _interopRequireDefault(_on);

  var _query2 = _interopRequireDefault(_query);

  var _window2 = _interopRequireDefault(_window);

  var _touch2 = _interopRequireDefault(_touch);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var socket = io.connect();
  socket.emit('dummycreate', 'dummyrooom');
  var submitButton = (0, _query2.default)(".submit-button");
  var connectionId = undefined;
  submitButton.on("click", function () {
    connectionId = _dom2.default.byId("connectionId").value.toLowerCase();
    var connectionData = {
      room: connectionId,
      type: "phone"
    };
    socket.emit('create', connectionData);
  });
  socket.on('alldeviceconnected', function (data) {
    if (data == "true") {
      var DeviceOrientationControls = function DeviceOrientationControls(object) {
        var scope = this;
        this.object = object;
        this.object.rotation.reorder("YXZ");
        this.enabled = true;
        this.deviceOrientation = {};
        this.screenOrientation = 0;

        var onDeviceOrientationChangeEvent = function onDeviceOrientationChangeEvent(event) {
          scope.deviceOrientation = event;
          scope.update();
        };

        var onScreenOrientationChangeEvent = function onScreenOrientationChangeEvent() {
          scope.screenOrientation = window.orientation || 0;
          scope.update();
        };

        var setObjectQuaternion = function () {
          var zee = new THREE.Vector3(0, 0, 1);
          var euler = new THREE.Euler();
          var q0 = new THREE.Quaternion();
          var q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
          return function (quaternion, alpha, beta, gamma, orient) {
            euler.set(beta, alpha, -gamma, 'YXZ');
            quaternion.setFromEuler(euler);
            quaternion.multiply(q1);
            quaternion.multiply(q0.setFromAxisAngle(zee, -orient));
          };
        }();

        this.connect = function () {
          onScreenOrientationChangeEvent();
          window.addEventListener('orientationchange', onScreenOrientationChangeEvent, false);
          window.addEventListener('deviceorientation', onDeviceOrientationChangeEvent, false);
          scope.enabled = true;
        };

        this.disconnect = function () {
          window.removeEventListener('orientationchange', onScreenOrientationChangeEvent, false);
          window.removeEventListener('deviceorientation', onDeviceOrientationChangeEvent, false);
          scope.enabled = false;
        };

        this.update = function () {
          if (scope.enabled === false) return;
          var alpha = scope.deviceOrientation.alpha ? THREE.Math.degToRad(scope.deviceOrientation.alpha) : 0;
          var beta = scope.deviceOrientation.beta ? THREE.Math.degToRad(scope.deviceOrientation.beta) : 0;
          var gamma = scope.deviceOrientation.gamma ? THREE.Math.degToRad(scope.deviceOrientation.gamma) : 0;
          var orient = scope.screenOrientation ? THREE.Math.degToRad(scope.screenOrientation) : 0;
          setObjectQuaternion(scope.object.quaternion, alpha, beta, gamma, orient);
          var coords = {
            x: scope.object.quaternion.x,
            y: scope.object.quaternion.y,
            z: scope.object.quaternion.z,
            w: scope.object.quaternion.w,
            room: connectionId
          };
          socket.emit("coordupdate", coords);
        };

        this.dispose = function () {
          this.disconnect();
        };

        this.connect();
      };

      console.log("connection successful");
      _dom2.default.byId("connectionStatus").innerHTML = "Connected";
      _dom2.default.byId("container").innerHTML = "Rotate your phone to control the map";
      var container = undefined,
          camera = undefined,
          scene = undefined,
          renderer = undefined,
          controls = undefined,
          geometry = undefined,
          mesh = undefined;
      ;
      container = document.getElementById('container');
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
      controls = new DeviceOrientationControls(camera);
      scene = new THREE.Scene();
    } else {
      _dom2.default.byId("connectionStatus").innerHTML = "Invalid Id";
    }
  });
});