define([], function () {
    'use strict';

    var socket = io.connect();
    console.log("on page");
    socket.emit('setPseudo', 'setPseudomessage');
    socket.emit('message', 'new message');
    socket.on('message', function (data) {
        console.log("received message from server" + data['message']);
    });
});