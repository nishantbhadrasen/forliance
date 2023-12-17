import { Component, OnInit } from "@angular/core";
import GeoJSON from "ol/format/GeoJSON.js";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { OSM, TileWMS, Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { fromLonLat } from "ol/proj";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import CircleStyle from "ol/style/Circle";

@Component({
  standalone: true,
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  map: Map = new Map();
  geojsonSource: VectorSource = new VectorSource();
  wmsLayer: any = new TileLayer();

  ngOnInit() {
    try {
      this.initMap();
      this.addWMSLayer();
    } catch (error) {
      console.error("An error occurred while initializing the map:", error);
    }
  }

  async initMap() {
    // Create a GeoJSON source using the provided URL
    this.geojsonSource = new VectorSource({
      format: new GeoJSON(),
    });

    // Create a GeoJSON layer
    const geojsonLayer = new VectorLayer({
      source: this.geojsonSource,
      style: this.customStyleFunction, // Add a custom style function
    });

    // Create a simple OpenStreetMap layer
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    const wmsLayer = new TileLayer({
      source: new TileWMS({
        url: "https://ahocevar.com/geoserver/wms", // Replace with a valid WMS URL
        params: { LAYERS: "YOUR_WMS_LAYER_NAME", TILED: true },
        serverType: "geoserver", // Adjust based on your WMS server type
        crossOrigin: "anonymous", // Handle cross-origin requests
      }),
      visible: false, // Set the initial visibility
    });

    // Create the map
    this.map = new Map({
      target: "ol-map",
      layers: [osmLayer, geojsonLayer, wmsLayer],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    // this.map.addLayer(this.wmsLayer);

    // Load GeoJSON data asynchronously
    await this.loadGeoJSONData(
      "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
    );
  }

  // Asynchronously load GeoJSON data from an external source
  async loadGeoJSONData(url: string) {
    try {
      const response = await fetch(url);
      const geojsonData = await response.json();

      // Update the GeoJSON source with new data
      this.geojsonSource.clear();
      const features: any[] = new GeoJSON().readFeatures(geojsonData, {
        featureProjection: "EPSG:3857",
      });
      this.geojsonSource.addFeatures(features);
    } catch (error) {
      console.error("An error occurred while fetching GeoJSON data:", error);
    }
  }

  // Custom style function based on GeoJSON properties
  customStyleFunction(feature: any) {
    const properties = feature.getProperties();
    const magnitude = properties["mag"];

    // Implement your custom styling logic based on properties
    return new Style({
      image: new CircleStyle({
        radius: magnitude * 1,
        fill: new Fill({
          color: "red", // Customize color based on magnitude or other properties
        }),
      }),
    });
  }

  addWMSLayer() {
    const wmsLayer = new TileLayer({
      source: new TileWMS({
        url: "https://sedac.ciesin.columbia.edu/geoserver/wms",
        params: {
          LAYERS: "gpw-v3:gpw-v3-population-density_2000",
          TILED: true,
        },
      }),
      visible: false,
    });

    this.map.addLayer(wmsLayer);
  }

  toggleWMSLayer() {
    const wmsLayer = this.map.getLayers().item(3);
    wmsLayer.setVisible(!wmsLayer.getVisible());
  }

  // Function to handle button click to refresh GeoJSON data
  refreshData() {
    // this.loadGeoJSONData('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson');
    window.location.reload();
  }
}
