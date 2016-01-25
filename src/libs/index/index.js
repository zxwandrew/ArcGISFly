import MapMod from "libs/MapMod/MapMod"

let mapMod = new MapMod("viewDiv");
mapMod.start();

import dom from "dojo/dom"
import on from "dojo/on"
import win from "dojo/_base/window"
import dojoquery from "dojo/query"
import domStyle from "dojo/dom-style"


function random() {
  let text = "";
  let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

let connId = random();

let socket = io.connect();
dom.byId("connectionId").innerHTML = "<h3>"+connId+"</h3>";

let connectionData = {room: connId, type: "computer"};
socket.emit('create', connectionData);


socket.on('message', function(data) {
    console.log("received message from server"+ data.message['x'])
});

socket.on('alldeviceconnected', function(data){
  if(data == "true"){//if phone connection is successful, remove top bar
    // dom.byId("connectionId").
    domStyle.set("connectionDiv", "display", "none");
  }
})

// //send mouse movements
// on(win.doc, "mousemove", function(evt){
//     var coord = { 'x' : evt.x, "y": evt.y};
//     console.log("clicked "+ coord['x']);
//     socket.emit('message', coord);
//
// });
