define(["dojo/dom", "dojo/on", "dojo/query", "dojo/_base/window", "dojo/touch", "dojo/topic", "dojo/dom-style", "dojo/parser", "dojox/mobile/Slider", "dojox/mobile", "dojox/mobile/deviceTheme", "DeviceOrientationControls/DeviceOrientationControls"], function (_dom, _on, _query, _window, _touch, _topic, _domStyle, _parser, _Slider, _mobile, _deviceTheme, _DeviceOrientationControls) {
  "use strict";

  var _dom2 = _interopRequireDefault(_dom);

  var _on2 = _interopRequireDefault(_on);

  var _query2 = _interopRequireDefault(_query);

  var _window2 = _interopRequireDefault(_window);

  var _touch2 = _interopRequireDefault(_touch);

  var _topic2 = _interopRequireDefault(_topic);

  var _domStyle2 = _interopRequireDefault(_domStyle);

  var _parser2 = _interopRequireDefault(_parser);

  var _Slider2 = _interopRequireDefault(_Slider);

  var _mobile2 = _interopRequireDefault(_mobile);

  var _deviceTheme2 = _interopRequireDefault(_deviceTheme);

  var _DeviceOrientationControls2 = _interopRequireDefault(_DeviceOrientationControls);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  _parser2.default.parse();

  var socket = io.connect();
  socket.emit('dummycreate', 'dummyrooom');
  var submitButton = (0, _query2.default)(".submit-button");
  var connectionId = "";
  var connectionHandler = undefined;
  var connectionState = false;
  var notPausedState = true;
  var speedControl = undefined;
  submitButton.on("click", function () {
    connectionId = _dom2.default.byId("connectionId").value.toLowerCase();
    var connectionData = {
      room: connectionId,
      type: "phone"
    };
    socket.emit('create', connectionData);

    if (connectionState) {}
  });
  socket.on('alldeviceconnected', function (data) {
    if (data == "true") {
      connectionState = true;
      _dom2.default.byId("phoneConnectionDiv").innerHTML = "";
      _dom2.default.byId("connectionStatus").innerHTML = "Connected";
      _dom2.default.byId("container").innerHTML = "Rotate your phone to control the map";

      _domStyle2.default.set("controlsContainer", "display", "block");

      _domStyle2.default.set("connectionStatus", "background-color", "green");

      var speedControlNode = _dom2.default.byId("speedControl");

      var SpeedControlSlider = new _Slider2.default({
        max: 0.1,
        min: 0,
        orientation: "V",
        step: 0,
        value: 0.01,
        onChange: function onChange(value) {
          console.log(value);
          var speedData = {
            speed: value,
            room: connectionId
          };
          socket.emit("speedupdate", speedData);
        }
      }, speedControlNode).startup();

      var elevationControlNode = _dom2.default.byId("elevationControl");

      var elevationControlSlider = new _Slider2.default({
        max: 1,
        min: 0,
        orientation: "V",
        step: 0,
        value: 0.5,
        onChange: function onChange(value) {
          console.log(value);
          var elevationData = {
            elevation: value,
            room: connectionId
          };
          socket.emit("elevationupdate", elevationData);
        }
      }, elevationControlNode).startup();

      var container = _dom2.default.byId('container');

      var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
      var controls = new _DeviceOrientationControls2.default(camera);

      var coordTopicHandle = _topic2.default.subscribe("coords", function (coords) {
        if (connectionState && notPausedState) {
          coords.room = connectionId;
          socket.emit("coordupdate", coords);
        }
      });
    } else {
      _dom2.default.byId("connectionStatus").innerHTML = "Invalid Id";
    }
  });
});