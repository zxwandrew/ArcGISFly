// import MapMod from "libs/MapMod/MapMod"
//
// let mapMod = new MapMod("viewDiv");
// mapMod.start();


var socket = io.connect();
console.log("on page")

socket.emit('setPseudo', 'setPseudomessage');
socket.emit('message', 'new message');

socket.on('message', function(data) {
    // addMessage(data['message'], data['pseudo']);
    console.log("received message from server"+ data['message'])
});

// // var WebSocketClient = require('websocket').client;
// import WebSocketClient from 'WebSocketClient';
// WebSocketClient.client;
// var client = new WebSocketClient();

// client.on('connect', function(connection) {
//     console.log('WebSocket Client Connected');
//     connection.on('error', function(error) {
//         console.log("Connection Error: " + error.toString());
//     });
//     connection.on('close', function() {
//         console.log('echo-protocol Connection Closed');
//     });
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log("Received: '" + message.utf8Data + "'");
//         }
//     });
//
//     function sendNumber() {
//         if (connection.connected) {
//             var number = Math.round(Math.random() * 0xFFFFFF);
//             connection.sendUTF(number.toString());
//             setTimeout(sendNumber, 1000);
//         }
//     }
//     sendNumber();
// });
//
// client.connect('ws://localhost:8080/', 'echo-protocol');
