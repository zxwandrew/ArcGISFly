import MapMod from "MapMod/MapMod"

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

let speed = 0.01;
let currentScreenCoord = [];

socket.on('message', function(data) {
    console.log("received message from server"+ data.message['x'])
});

socket.on('alldeviceconnected', function(data){
  if(data == "true"){//if phone connection is successful, remove top bar
    // mapMod.pan();
    domStyle.set("connectionDiv", "display", "none");
  }
});

socket.on('coordupdate', function(coord) {
    // console.log(coord.x + ", "+ coord.y + ", "+ coord.z + ", "+ coord.alpha + ", "+ coord.beta + ", "+ coord.gamma + ", "+coord.orient);
    // console.log(coord.x + ", "+ coord.y + ", "+ coord.z + ", "+ coord.alpha + ", "+coord.w);

    let screenCoord = {};

    if(coord.w>0){//calc the screen coordinate x
      screenCoord.x = (4*window.innerWidth)-(2*coord.w*window.innerWidth);
    }else{
      screenCoord.x = 2*Math.abs(coord.w)*window.innerWidth;
    }

    if(coord.beta>-90.0){//calc the screen coordinate y
      screenCoord.y = -1.0*(coord.beta/180.0)*window.innerHeight;
    }else{
      screenCoord.y = (-1.0*window.innerHeight)-(1.0-(Math.abs(coord.beta)/180.0))*window.innerHeight;
    }

    currentScreenCoord[0]=screenCoord.x;
    currentScreenCoord[1]=screenCoord.y;
    // console.log(screenCoord.x +", "+ screenCoord.y +" "+ speed);
    mapMod.rotate(screenCoord, speed);
    if(speed==0){

    }
    //mapMod.changeSpeed(coord.w*4);

});

socket.on('speedupdate', function(speedData){
  //mapMod.changeSpeed(speedData.speed);
  speed = speedData.speed;
});

socket.on('elevationupdate', function(elevationData){
  let elevationHeight = (1-(elevationData.elevation/2))*window.innerHeight;
  let testcoord = [window.innerWidth/2, window.innerHeight/2+150];
  // mapMod.changeElevation(currentScreenCoord, elevationHeight);
  mapMod.changeElevation(testcoord, elevationHeight);
});
