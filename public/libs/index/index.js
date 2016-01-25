define(["libs/MapMod/MapMod", "dojo/on", "dojo/_base/window"], function (_MapMod, _on, _window) {
    "use strict";

    var _MapMod2 = _interopRequireDefault(_MapMod);

    var _on2 = _interopRequireDefault(_on);

    var _window2 = _interopRequireDefault(_window);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var socket = io.connect();
    console.log("on page");

    function random() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    ;
    socket.emit('create', random());
    socket.emit('message', 'Room1 message');
    socket.on('message', function (data) {
        console.log("received message from server" + data.message['x']);
    });
    (0, _on2.default)(_window2.default.doc, "mousemove", function (evt) {
        var coord = {
            'x': evt.x,
            "y": evt.y
        };
        console.log("clicked " + coord['x']);
        socket.emit('message', coord);
    });
});