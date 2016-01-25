import MapMod from "libs/MapMod/MapMod"

//let mapMod = new MapMod("viewDiv");
// mapMod.start();

import on from "dojo/on"
import win from "dojo/_base/window"


var socket = io.connect();
console.log("on page")

function random() {
  //Generate 5 char long random string for name
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

socket.emit('create', random());
// socket.to('room1').emit('message', 'rooom1message');
socket.emit('message', 'Room1 message');

// socket.emit('setPseudo', 'setPseudomessage');
// socket.emit('message', 'new message');
//
socket.on('message', function(data) {
    // addMessage(data['message'], data['pseudo']);
    console.log("received message from server"+ data.message['x'])
});




on(win.doc, "mousemove", function(evt){
    // remove listener after first event
    //signal.remove();
    // do something else...

    var coord = { 'x' : evt.x, "y": evt.y};
    console.log("clicked "+ coord['x']);
    socket.emit('message', coord);

});
