import Map from "esri/Map";
import SceneView from "esri/views/SceneView";
import dom from 'dojo/dom';
import 'dojo/domReady!';

export class MapMod{
  constructor(viewDiv){
    this.viewDiv = viewDiv;
  }
  start(){
    let map = new Map({
      basemap: "streets"
    });
    let view = new SceneView({
      container: this.viewDiv,
      map: map,
      scale: 50000000,
      center: [-101.17, 21.78]
    });
  }
}

export { MapMod as default}
