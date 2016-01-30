import Map from "esri/Map";
import SceneView from "esri/views/SceneView";
import dom from 'dojo/dom';
import ArcGISElevationLayer from "esri/layers/ArcGISElevationLayer";
import 'dojo/domReady!';


export class MapMod{
  constructor(viewDiv){
    this.viewDiv = viewDiv;
  }
  start(){
    this.map = new Map({
      basemap: "hybrid"
    });

    this.view = new SceneView({
      container: this.viewDiv,
      map: this.map,
      camera: {
          position: [7.654, 45.919, 2183],
          tilt: 90,
          fov: 120
        }
    });

    this.view.then(function(evt){
      console.log("loaded");
      evt.navigation.rotate.begin([0,0],2);
    }, function(error){
      console.log("error loading")
    });

  }

  rotate(ScreenCoord){
    this.view.navigation.rotate.update([ScreenCoord.x, ScreenCoord.y], 2);
    this.view.navigation.pan.beginContinuous(4);

  }
  pan(){
    this.view.navigation.pan.beginContinuous(4);
  }


}

export { MapMod as default}
