import dom from "dojo/dom";
import on from "dojo/on";
import dojoQuery from "dojo/query";
import win from "dojo/_base/window";
import touch from "dojo/touch"
import topic from "dojo/topic";
import domStyle from "dojo/dom-style"

// import VerticalSlider from "dijit/form/VerticalSlider";
// import VerticalRule from "dijit/form/VerticalRule";
import parser from "dojo/parser"

import Slider from "dojox/mobile/Slider";
import mobile from "dojox/mobile"; // This is a mobile app.
// dojo.require("dojox.mobile.parser");	// This mobile app supports running on desktop browsers
// import mobilecompat from "dojox/mobile/compat";	// This mobile app uses declarative programming with fast mobile parser
import deviceTheme from "dojox/mobile/deviceTheme";

import DeviceOrientationControls from "DeviceOrientationControls/DeviceOrientationControls";

parser.parse();

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
let speedControl;

submitButton.on("click", function() {
  connectionId = dom.byId("connectionId").value.toLowerCase();

  let connectionData = {
    room: connectionId,
    type: "phone"
  };
  socket.emit('create', connectionData);

  if (connectionState) {
    //enable handler
  }

});

socket.on('alldeviceconnected', function(data) {
  if (data == "true") { //if phone connection is successful
    connectionState = true;

    //display connected
    dom.byId("phoneConnectionDiv").innerHTML = "";
    dom.byId("connectionStatus").innerHTML = "Connected";
    dom.byId("container").innerHTML = "Rotate your phone to control the map";
    domStyle.set("controlsContainer", "display", "block");

    let speedControlNode = dom.byId("speedControl");
    let SpeedControlSlider = new Slider({
      max: 0.1,
      min: 0,
      orientation: "V",
      step: 0,
      value: 0.01,
      onChange: function(value) {
        console.log(value);
        let speedData = {
          speed: value,
          room: connectionId
        };
        socket.emit("speedupdate", speedData);
      }
    }, speedControlNode).startup();

    let elevationControlNode = dom.byId("elevationControl");
    let elevationControlSlider = new Slider({
      max: 1,
      min: 0,
      orientation: "V",
      step: 0,
      value: 0.5,
      onChange: function(value) {
        console.log(value);
        let elevationData = {
          elevation: value,
          room: connectionId
        }
        socket.emit("elevationupdate", elevationData);
      }
    }, elevationControlNode).startup();


    let container = dom.byId('container');
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

    let controls = new DeviceOrientationControls(camera);
    let coordTopicHandle = topic.subscribe("coords", function(coords) {
      if (connectionState && notPausedState) {
        coords.room = connectionId;
        socket.emit("coordupdate", coords);
      }
    });

  } else { //bad connection string
    dom.byId("connectionStatus").innerHTML = "Invalid Id";
  }
});
