import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  map: Map = new Map();

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    // Long lat for Eifel Str. 20, Bonn, 53119, Germany
    const place = [7.0842461585998535, 50.737918853759766];

    const point = new Point(place);

    this.map = new Map({
      target: 'ol-map',
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
            'circle-radius': 9,
            'circle-fill-color': 'red',
          },
        }),
      ],
    });

    this.map.on('singleclick', (event) => {
      console.log({ event });
    });
  }
}
