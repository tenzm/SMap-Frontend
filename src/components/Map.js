import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Button } from 'antd';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

let markers = []

const Map = (props) => {
  const mapContainerRef = useRef(null);

  let data_pos = [];
  let map;

  // Initialize map when component mounts
  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [127.59235,50.24513],
      zoom: 10
    });

    const language = new MapboxLanguage();
    map.addControl(language);
    map.addControl(new mapboxgl.NavigationControl(),"bottom-left");

    data_pos = props.callback(map, markers);

    const coordinatesGeocoder = function (query) {

      const matches = query.match(
      /^[ ]*(?:Post_id: )?(-?\d+\.?\d*)/i
      );
      if (!matches) {
      return null;
      }
       
      function coordinateFeature(id) {
        console.log(data_pos)
        data_pos = props.callback(map, markers)
        for (let i=0; i < data_pos.length; i++){
          
          if (id === data_pos[i]['post_id'] ){
            console.log(data_pos[i]['river'])
            return {
              center: [data_pos[i]['longitude'], data_pos[i]['latitude']],
              geometry: {
              type: 'Point',
              coordinates: [data_pos[i]['longitude'], data_pos[i]['latitude']]
              },
              place_name: 'Post_id: ' + id,
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

  let threed = true;
  let layers = []

  const change_view = () => {
    if (threed){
      map.setStyle('mapbox://styles/mr9bit/cl3iwai1s000l14nfihyhpma2');
      
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
        });
         map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
         
    }
    else{
      map.setStyle('mapbox://styles/mapbox/streets-v11');
    }

    threed = !threed;
  }

  return (
    <div>
      <Button className='view-button' onClick={change_view}>3D</Button>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;