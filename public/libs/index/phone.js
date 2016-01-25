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
  var submitButton = (0, _query2.default)(".submit-button");
  submitButton.on("click", function () {
    var connectionId = _dom2.default.byId("connectionId").value;

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
      (0, _on2.default)(_window2.default.doc, _touch2.default.move, function (evt) {
        var coord = {
          'x': evt.clientX,
          "y": evt.clientY
        };
        console.log("clicked " + coord['x']);
        socket.emit('message', coord);
      });
    } else {
      _dom2.default.byId("connectionStatus").innerHTML = "Invalid Id";
    }
  });
});