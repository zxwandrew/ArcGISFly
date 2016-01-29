define(["MapMod/MapMod", "dojo/dom", "dojo/on", "dojo/_base/window", "dojo/query", "dojo/dom-style"], function (_MapMod, _dom, _on, _window, _query, _domStyle) {
  "use strict";

  var _MapMod2 = _interopRequireDefault(_MapMod);

  var _dom2 = _interopRequireDefault(_dom);

  var _on2 = _interopRequireDefault(_on);

  var _window2 = _interopRequireDefault(_window);

  var _query2 = _interopRequireDefault(_query);

  var _domStyle2 = _interopRequireDefault(_domStyle);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var mapMod = new _MapMod2.default("viewDiv");
  mapMod.start();

  function random() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  ;
  var connId = random();
  var socket = io.connect();
  _dom2.default.byId("connectionId").innerHTML = "<h3>" + connId + "</h3>";
  var connectionData = {
    room: connId,
    type: "computer"
  };
  socket.emit('create', connectionData);
  socket.on('message', function (data) {
    console.log("received message from server" + data.message['x']);
  });
  socket.on('coordupdate', function (coord) {
    console.log("received message from server: " + coord.x + ", " + coord.y + ", " + coord.z);
    var screenCoord = {};
    screenCoord.x = window.innerWidth - Math.abs(coord.y * window.innerWidth);
    screenCoord.y = coord.x * window.innerHeight + window.innerHeight / 2;
    mapMod.rotate(screenCoord);
  });
  socket.on('alldeviceconnected', function (data) {
    if (data == "true") {
      mapMod.pan();

      _domStyle2.default.set("connectionDiv", "display", "none");
    }
  });
});