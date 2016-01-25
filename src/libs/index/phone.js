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
  socket.emit('create', connectionId);

  //display connected
  dom.byId("connectionStatus").innerHTML="Connected";

  //send mouse movements
  on(win.doc, touch.move, function(evt){
      var coord = { 'x' : evt.clientX, "y": evt.clientY};
      console.log("clicked "+ coord['x']);
      socket.emit('message', coord);

  });

})
