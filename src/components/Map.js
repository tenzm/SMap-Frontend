import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import axios from 'axios';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

let markers = []

const Map = (props) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  let data_pos = [];

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [127.59235,50.24513],
      zoom: 10.7
    });

    const language = new MapboxLanguage();
    map.addControl(language);


    props.callback(map, markers);

    

      const coordinatesGeocoder = function (query) {

        const matches = query.match(
        /^[ ]*(?:Lat: )?(-?\d+\.?\d*)/i
        );
        if (!matches) {
        return null;
        }
         
        function coordinateFeature(id) {
          for (let i=0; i < data_pos.length; i++){
            if (id === data_pos[i]['post_id']){
              console.log(data_pos[i]['post_id'])
              return {
                center: [data_pos[i]['longitude'], data_pos[i]['latitude']],
                geometry: {
                type: 'Point',
                coordinates: [data_pos[i]['longitude'], data_pos[i]['latitude']]
                },
                place_name: 'Post_id: ' + id ,
                place_type: ['coordinate'],
                properties: {},
                type: 'Feature'
                };
            }
        
          }
         
        }
         
        const id1 = Number(matches[1]);
       
        const geocodes = [];
        geocodes.push(coordinateFeature(id1));
         
        return geocodes;
        };
         
        // Add the control to the map.
        map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: coordinatesGeocoder,
        zoom: 10,
        placeholder: 'Post_id:',
        mapboxgl: mapboxgl,
        reverseGeocode: true
        })
        );

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>

      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;