import Map from "esri/Map";
import SceneView from "esri/views/SceneView";
import dom from 'dojo/dom';
import ArcGISElevationLayer from "esri/layers/ArcGISElevationLayer";
import SceneLayer from 'esri/layers/SceneLayer';
import WebScene from 'esri/WebScene';
import PortalItem from 'esri/portal/PortalItem';
import 'dojo/domReady!';



export class MapMod{
  constructor(viewDiv){
    this.viewDiv = viewDiv;
    this.previousSpeed = 0.01;
  }
  start(){
    // this.map = new Map({
    //   basemap: "hybrid"
    // });
    this.map = new WebScene({
        portalItem: new PortalItem({
          id: "1cc9059cdb1f4cabbcc23a97ea23d4c9"
        })
    });

    this.view = new SceneView({
      container: this.viewDiv,
      map: this.map,
      camera: {
          position: [-75.19136110043166, 39.93995470893074, 1000],
          tilt: 90,
          fov: 120
        }
    });

    this.view.then(function(evt){
      console.log("loaded");
      evt.navigation.rotate.begin([0,0],2);
    }, function(error){
      console.log("error loading");
    });
    // //Create SceneLayer and add to the map
    // this.sceneLayer = new SceneLayer({
    //   url: "https://scene.arcgis.com/arcgis/rest/services/Hosted/Buildings_Brest/SceneServer/layers/0/"
    // });
    // map.add(sceneLayer);
  }

  rotate(ScreenCoord, speed){
    // this.view.navigation.rotate.update([ScreenCoord.x, ScreenCoord.y], 2);
    if(speed==0){
      if(this.previousSpeed==0){
        this.view.navigation.rotate.update([ScreenCoord.x, ScreenCoord.y], 2);
      }else{
      this.view.navigation.rotate.update([ScreenCoord.x, 0], 2);
      this.view.navigation.pan.endContinuous();
      this.view.navigation.pan.end(0,0);
    }
    }else{
      this.view.navigation.rotate.update([ScreenCoord.x, ScreenCoord.y], 2);
      this.view.navigation.pan.beginContinuous(4);
      this.view.navigation.pan.updateContinuous(speed)
    }
    this.previousSpeed = speed;

  }

  pan(){
    this.view.navigation.pan.beginContinuous(4);
  }

  changeSpeed(speed){
    this.view.navigation.pan.updateContinuous(speed)
  }

  stopPan(){
    this.view.navigation.pan.endContinuous();
  }

  changeElevation(currentScreenCoord, elevationHeight){
    this.view.navigation.pan._panMode=1;
    this.view.navigation.pan.begin(currentScreenCoord);
    this.view.navigation.pan.update([currentScreenCoord[0], elevationHeight]);
    this.view.navigation.pan.end([currentScreenCoord[0], elevationHeight]);
    this.view.navigation.pan._panMode=0;

  }

}

export { MapMod as default}
