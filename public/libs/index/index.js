define(["libs/MapMod/MapMod", "dojo/dom", "dojo/on", "dojo/_base/window", "dojo/query"], function (_MapMod, _dom, _on, _window, _query) {
  "use strict";

  var _MapMod2 = _interopRequireDefault(_MapMod);

  var _dom2 = _interopRequireDefault(_dom);

  var _on2 = _interopRequireDefault(_on);

  var _window2 = _interopRequireDefault(_window);

  var _query2 = _interopRequireDefault(_query);

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
  _dom2.default.byId("connectionId").innerHTML = connId;
  socket.emit('create', connId);
  socket.on('message', function (data) {
    console.log("received message from server" + data.message['x']);
  });
  socket.on('phonconnected', function (data) {
    dojoQuery("#connectionDiv").style("display", "none");
  });
});