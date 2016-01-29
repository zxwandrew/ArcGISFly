define(["dojo/dom", "dojo/on", "dojo/query", "dojo/_base/window", "dojo/touch", "dojo/topic", "DeviceOrientationControls/main"], function (_dom, _on, _query, _window, _touch, _topic, _main) {
  "use strict";

  var _dom2 = _interopRequireDefault(_dom);

  var _on2 = _interopRequireDefault(_on);

  var _query2 = _interopRequireDefault(_query);

  var _window2 = _interopRequireDefault(_window);

  var _touch2 = _interopRequireDefault(_touch);

  var _topic2 = _interopRequireDefault(_topic);

  var _main2 = _interopRequireDefault(_main);

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
      console.log("connection successful");
      _dom2.default.byId("connectionStatus").innerHTML = "Connected";
      _dom2.default.byId("container").innerHTML = "Rotate your phone to control the map";
      var container = undefined,
          camera = undefined,
          scene = undefined,
          renderer = undefined,
          controls = undefined,
          geometry = undefined,
          mesh = undefined,
          coordTopicHandle = undefined;
      container = document.getElementById('container');
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
      controls = new _main2.default(camera);
      coordTopicHandle = _topic2.default.subscribe("coords", function (coords) {
        console.log(coords);
      });
      scene = new THREE.Scene();
    } else {
      _dom2.default.byId("connectionStatus").innerHTML = "Invalid Id";
    }
  });
});