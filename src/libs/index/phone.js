import dom from "dojo/dom"
import on from "dojo/on"
import dojoQuery from "dojo/query"
import win from "dojo/_base/window"
import touch from "dojo/touch"

let socket = io.connect();


let submitButton = dojoQuery(".submit-button")


submitButton.on("click", function(){
  // let connectionId = dojoQuery("#connectionId").get("value")
  let connectionId  = dom.byId("connectionId").value

  //will need error checking
  let connectionData = {room: connectionId, type: "phone"};
  socket.emit('create', connectionData);

});


socket.on('alldeviceconnected', function(data){
  if(data == "true"){//if phone connection is successful, remove top bar
    console.log("connection successful");

    //display connected
    dom.byId("connectionStatus").innerHTML="Connected";

    //start sending mouse movements
    on(win.doc, touch.move, function(evt){
        var coord = { 'x' : evt.clientX, "y": evt.clientY};
        console.log("clicked "+ coord['x']);
        socket.emit('message', coord);

    });

  }else{//bad connection string
    dom.byId("connectionStatus").innerHTML="Invalid Id";
  }
})
