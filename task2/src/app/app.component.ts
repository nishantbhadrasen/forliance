import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature, Overlay } from "ol";
import { fromLonLat, transform } from "ol/proj";
import { toStringHDMS } from "ol/coordinate";
import { ReverseApiService } from "./reverse-api.service";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  providers: [ReverseApiService],
})
export class AppComponent implements OnInit {
  constructor(private reverseApiService: ReverseApiService) {}
  map: Map = new Map();
  popup: Overlay = new Overlay({
    element: document.getElementById("popup") || undefined,
    positioning: "bottom-center",
    stopEvent: false,
    offset: [0, -10],
  });

  ngOnInit() {
    this.initializeMap();
    this.setupPopup();
  }

  private initializeMap() {
    // Long lat for Eifel Str. 20, Bonn, 53119, Germany
    const place = [7.0842461585998535, 50.737918853759766];

    const point = new Point(place);

    this.map = new Map({
      target: "ol-map",
      view: new View({
        center: fromLonLat(place),
        zoom: 18,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(point)],
          }),
          style: {
            "circle-radius": 9,
            "circle-fill-color": "red",
          },
        }),
      ],
    });

    this.map.on("singleclick", (event) => {
      event.stopPropagation();

      const longLat = transform(event.coordinate, "EPSG:3857", "EPSG:4326");

      this.reverseApiService.postData(longLat).subscribe(
        (response: any) => {
          console.log("API Response:", response);
          this.showPopup(true, response.address, event.coordinate);
        },
        (error: any) => {
          console.error("API Error:", error);
          this.showPopup(false, undefined, event.coordinate);
        }
      );
    });
  }

  private setupPopup() {
    // Create a popup overlay
    this.popup = new Overlay({
      element: document.getElementById("popup") || undefined,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -10],
    });

    // Add the popup to the map
    this.map.addOverlay(this.popup);
  }

  private showPopup(status: boolean, address?: any, coordinates?: number[]) {
    // Transform the coordinates to EPSG:4326
    // const lonLat = transform(coordinates, 'EPSG:3857', 'EPSG:4326');

    console.log("eta");

    let content = ``;

    if (!status) {
      content = `
      <div style="background: #fff; padding: 1rem; border-radius: 15px; position: relative">
            <h3>Error fetching data</h3>
          </div>
          <button id="popup-closer-button" style="position: absolute;top: 10px;right: 10px;background: red;border: none;color: #fff;z-index: 999">
          X
          </button>
      `;
    } else {
      // Create structured HTML content for the popup
      content = `
    <div style="background: #fff; padding: 1rem; border-radius: 15px; position: relative">
          <h3>${address.road || ""} ${address.house_number || ""}</h3>
          <p>${address.postcode || ""} ${address.city || ""}</p>
          <p>${address.state || ""}, ${address.country || ""}</p>
          <p>District: ${address.city_district || ""}</p>
          <p>Quarter: ${address.quarter || ""}</p>
        </div>
        <button id="popup-closer-button" style="position: absolute;top: 10px;right: 10px;background: red;border: none;color: #fff;z-index: 999">
        X
        </button>
    `;
    }

    // Set popup content and position
    const elm = this.popup.getElement() as any;
    elm.innerHTML = content;
    this.popup.setPosition(coordinates);

    // Add click event listener to the close button
    const closer = document.getElementById("popup-closer-button") as any;
    closer.addEventListener("click", this.closePopup.bind(this));
  }

  private closePopup(event: Event) {
    event.stopPropagation(); // Stop event propagation
    this.popup.setPosition(undefined);

    // Remove the close button from the DOM
    const closer = document.getElementById("popup-closer-button");
    if (closer && closer.parentNode) {
      closer.parentNode.removeChild(closer);
    }
  }
}
