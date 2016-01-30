import dom from "dojo/dom"
import on from "dojo/on"
import dojoQuery from "dojo/query"
import win from "dojo/_base/window"
import touch from "dojo/touch"
import topic from "dojo/topic";
import DeviceOrientationControls from "DeviceOrientationControls/DeviceOrientationControls"


let socket = io.connect();
socket.emit('dummycreate', 'dummyrooom');

// //test
// let container, camera, controls, coordTopicHandle;
//
//
// container = document.getElementById( 'container' );
// camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
// controls = new DeviceOrientationControls( camera );
// //end TEST

let submitButton = dojoQuery(".submit-button");
let connectionId = "";

let connectionHandler;
let connectionState = false;
let notPausedState = true;

submitButton.on("click", function(){
  connectionId  = dom.byId("connectionId").value.toLowerCase();

  let connectionData = {room: connectionId, type: "phone"};
  socket.emit('create', connectionData);

  if(connectionState){
    //enable handler
  }

});


socket.on('alldeviceconnected', function(data){
  if(data == "true"){//if phone connection is successful
    connectionState = true;

    //display connected
    dom.byId("connectionStatus").innerHTML="Connected";
    dom.byId("container").innerHTML = "Rotate your phone to control the map";

		let container, camera, controls, coordTopicHandle;


    container = document.getElementById( 'container' );
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
		controls = new DeviceOrientationControls( camera );
    coordTopicHandle = topic.subscribe("coords", function(coords){
      if(connectionState && notPausedState){
        coords.room = connectionId;
        socket.emit("coordupdate", coords);
      }
    });
  }else{//bad connection string
    dom.byId("connectionStatus").innerHTML="Invalid Id";
  }
});
