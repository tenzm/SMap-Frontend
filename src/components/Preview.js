import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import axios from 'axios';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import Map from './Map';
import Hud from './Hud';

let markers_array = [];
let map_current;

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

let markers = []

const Preview = () => {
    const get_markers = (map, markers) => {
        markers_array = markers;
        map_current = map;
      }
    
      const update_history = (day, month, year) => {
        for (let i = 0; i < markers_array.length; i++) {
          markers_array[i].remove();
        }
        axios.get(`http://localhost:8000/get_hydroposts_by_date_and_rect?x0=50&y0=120&x1=55&y1=140&year=${year}&month=${month}&day=${day}`)
          .then(res => {
            console.log(res.data);
    
            const data = res.data;
            console.log(res.data[0]);
            for (let i = 0; i < data.length; i++) {
              let color = "";
              let html = "";
              switch (data[i]['post_type']) {
                case 0:
                  color = "#3083ff";
                  html = `<h3><b>Номер гидропоста:</b> ` + data[i]['post_id'] + `</h3><p><b>Река:</b> ` + data[i]['river'] + `</p><p><b>Регион:</b> ` + data[i]['region'] + `</p><p><b>Уровень воды:</b> ` + data[i]['value'] + `</p></p>`
                  if (data[i]['status'] == 404) html = `<h3><b>Номер гидропоста:</b> ` + data[i]['post_id'] + `</h3><p><b>Река:</b> ` + data[i]['river'] + `</p><p><b>Регион:</b> ` + data[i]['region'] + `</p></p>`
    
                  break;
                case 1:
                  color = "#E80000";
                  html = `<h3><b>Номер метеопоста:</b> ` + data[i]['post_id'] + `</h3><p><b>Регион:</b> ` + data[i]['river'] + `</p></p>`
                  break;
    
              }
              markers_array.push(new mapboxgl.Marker({ "color": color, "scale": 0.7 })
                .setLngLat([data[i]['longitude'], data[i]['latitude']])
                .setPopup(
                  new mapboxgl.Popup({ offset: 10 }) // add popups
                    .setHTML(
                      html
                    ))
                .addTo(map_current));
    
    
    
    
            }
    
    
          })
      }
  return (
    <div>
        
      <Map callback={get_markers} />
      <Hud callback={update_history} />
    </div>
  );
};

export default Preview;