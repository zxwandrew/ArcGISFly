import dom from "dojo/dom";
import on from "dojo/on";
import topic from "dojo/topic";

export class DeviceOrientationControls{


  constructor(object){
    this.scope = this;
    this.object = object;
    this.object.rotation.reorder( "YXZ" );

    this.enabled = true;

    this.deviceOrientation = {};
    this.screenOrientation = 0;


    this.orientationChangeHandle;
    this.onDeviceOrientationChangeHandle;

    this.connect();

  }

  connect(){
    // this.onScreenOrientationChangeEvent(); // run once on load
    this.screenOrientation = window.orientation || 0;
    this.update();

    window.addEventListener( 'orientationchange', ()=>{
      this.screenOrientation = window.orientation || 0;
      this.update();
    }, false );
    window.addEventListener( 'deviceorientation', event=>{
      this.deviceOrientation = event;
      this.update.call(this.scope);
    }, false );

    this.enabled = true;
  };

  disconnect(){
    window.removeEventListener( 'orientationchange', this.onScreenOrientationChangeEvent, false );
    window.removeEventListener( 'deviceorientation', this.onDeviceOrientationChangeEvent, false );

    this.enabled = false;
  }

  update(){
    if ( this.enabled === false ) return;

    let alpha  = this.deviceOrientation.alpha ? THREE.Math.degToRad( this.deviceOrientation.alpha ) : 0; // Z
    let beta   = this.deviceOrientation.beta  ? THREE.Math.degToRad( this.deviceOrientation.beta  ) : 0; // X'
    let gamma  = this.deviceOrientation.gamma ? THREE.Math.degToRad( this.deviceOrientation.gamma ) : 0; // Y''
    let orient = this.screenOrientation       ? THREE.Math.degToRad( this.screenOrientation       ) : 0; // O



    // this.setObjectQuaternion( this.object.quaternion, alpha, beta, gamma, orient );
    let zee = new THREE.Vector3( 0, 0, 1 );
    let euler = new THREE.Euler();
    let q0 = new THREE.Quaternion();
    let q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) );

    euler.set( beta, alpha, - gamma, 'YXZ' );                       // 'ZXY' for the device, but 'YXZ' for us
    this.object.quaternion.setFromEuler( euler );                               // orient the device
    this.object.quaternion.multiply( q1 );                                      // camera looks out the back of the device, not the top
    this.object.quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) );    // adjust for screen orientation

    //send off to phone.js now
    let coords = {x:  this.object.quaternion.x, y: this.object.quaternion.y, z: this.object.quaternion.z, w: this.object.quaternion.w, alpha: this.deviceOrientation.alpha, beta: this.deviceOrientation.beta, gamma: this.deviceOrientation.gamma, orient: this.screenOrientation};
    console.log(this.object.quaternion.x +", "+ this.object.quaternion.y +", "+this.object.quaternion.z +", "+this.object.quaternion.w + ","+ this.deviceOrientation.gamma);

    topic.publish("coords", coords);
  };

  dispose(){
    this.disconnect();
  };
}

export {DeviceOrientationControls as default}
