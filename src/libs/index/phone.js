import dom from "dojo/dom"
import on from "dojo/on"
import dojoQuery from "dojo/query"
import win from "dojo/_base/window"
import touch from "dojo/touch"
import topic from "dojo/topic";
import DeviceOrientationControls from "DeviceOrientationControls/DeviceOrientationControls"


let socket = io.connect();
socket.emit('dummycreate', 'dummyrooom');

let submitButton = dojoQuery(".submit-button")
let connectionId

let connectionHandler;
let connectionState = false;
let notPausedState = true;

submitButton.on("click", function(){
  // let connectionId = dojoQuery("#connectionId").get("value")
  connectionId  = dom.byId("connectionId").value.toLowerCase();

  //will need error checking
  let connectionData = {room: connectionId, type: "phone"};
  socket.emit('create', connectionData);

  if(connectionState){
    //enable handler
  }

});


socket.on('alldeviceconnected', function(data){
  if(data == "true"){//if phone connection is successful, remove top bar
    console.log("connection successful");
    connectionState = true;

    //display connected
    dom.byId("connectionStatus").innerHTML="Connected";
    dom.byId("container").innerHTML = "Rotate your phone to control the map";


		let container, camera, scene, renderer, controls, geometry, mesh, coordTopicHandle;


    container = document.getElementById( 'container' );
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
		controls = new DeviceOrientationControls( camera );
    coordTopicHandle = topic.subscribe("coords", function(coords){
      // console.log(coords);
      if(connectionState && notPausedState){
        coords.room = connectionId;
        socket.emit("coordupdate", coords);
      }
    });
    // scene = new THREE.Scene();
  }else{//bad connection string
    dom.byId("connectionStatus").innerHTML="Invalid Id";
  }
});
