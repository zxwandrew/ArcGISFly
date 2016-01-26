import dom from "dojo/dom"
import on from "dojo/on"
import dojoQuery from "dojo/query"
import win from "dojo/_base/window"
import touch from "dojo/touch"


let socket = io.connect();
socket.emit('dummycreate', 'dummyrooom');

let submitButton = dojoQuery(".submit-button")
let connectionId

submitButton.on("click", function(){
  // let connectionId = dojoQuery("#connectionId").get("value")
  connectionId  = dom.byId("connectionId").value.toLowerCase();

  //will need error checking
  let connectionData = {room: connectionId, type: "phone"};
  socket.emit('create', connectionData);

});


socket.on('alldeviceconnected', function(data){
  if(data == "true"){//if phone connection is successful, remove top bar
    console.log("connection successful");

    //display connected
    dom.byId("connectionStatus").innerHTML="Connected";

    // //start sending mouse movements
    // on(win.doc, touch.move, function(evt){
    //     var coord = { 'x' : evt.clientX, "y": evt.clientY};
    //     console.log("clicked "+ coord['x']);
    //     socket.emit('message', coord);
    // });

    //start head tracking here!

		let container, camera, scene, renderer, controls, geometry, mesh;

		// let animate = function(){
		// 	window.requestAnimationFrame( animate );
		// 	controls.update();
		// 	renderer.render(scene, camera);
		// };

    //a mess right now
    function DeviceOrientationControls( object ) {

    	var scope = this;

    	this.object = object;
    	this.object.rotation.reorder( "YXZ" );

    	this.enabled = true;

    	this.deviceOrientation = {};
    	this.screenOrientation = 0;

    	var onDeviceOrientationChangeEvent = function ( event ) {

    		scope.deviceOrientation = event;
        scope.update();

    	};

    	var onScreenOrientationChangeEvent = function () {

    		scope.screenOrientation = window.orientation || 0;
        scope.update();

    	};

    	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

    	var setObjectQuaternion = function () {

    		var zee = new THREE.Vector3( 0, 0, 1 );

    		var euler = new THREE.Euler();

    		var q0 = new THREE.Quaternion();

    		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

    		return function ( quaternion, alpha, beta, gamma, orient ) {

    			euler.set( beta, alpha, - gamma, 'YXZ' );                       // 'ZXY' for the device, but 'YXZ' for us

    			quaternion.setFromEuler( euler );                               // orient the device

    			quaternion.multiply( q1 );                                      // camera looks out the back of the device, not the top

    			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) );    // adjust for screen orientation

    		}

    	}();

    	this.connect = function() {

    		onScreenOrientationChangeEvent(); // run once on load

    		window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
    		window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

    		scope.enabled = true;

    	};

    	this.disconnect = function() {

    		window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
    		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

    		scope.enabled = false;

    	};

    	this.update = function () {

    		if ( scope.enabled === false ) return;

    		var alpha  = scope.deviceOrientation.alpha ? THREE.Math.degToRad( scope.deviceOrientation.alpha ) : 0; // Z
    		var beta   = scope.deviceOrientation.beta  ? THREE.Math.degToRad( scope.deviceOrientation.beta  ) : 0; // X'
    		var gamma  = scope.deviceOrientation.gamma ? THREE.Math.degToRad( scope.deviceOrientation.gamma ) : 0; // Y''
    		var orient = scope.screenOrientation       ? THREE.Math.degToRad( scope.screenOrientation       ) : 0; // O

    		setObjectQuaternion( scope.object.quaternion, alpha, beta, gamma, orient );

        //send off to socket now
        let coords = {x:  scope.object.quaternion.x, y: scope.object.quaternion.y, z:scope.object.quaternion.z, w:scope.object.quaternion.w, room:connectionId};
        socket.emit("coordupdate", coords);

    	};

    	this.dispose = function () {

    		this.disconnect();

    	};

    	this.connect();

    };

    container = document.getElementById( 'container' );
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

		controls = new DeviceOrientationControls( camera );
    scene = new THREE.Scene();



  }else{//bad connection string
    dom.byId("connectionStatus").innerHTML="Invalid Id";
  }
})
