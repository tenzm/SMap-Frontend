import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import axios from 'axios';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';



const Map = () => {
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

    

    axios.get(`http://localhost:8000/get_hydroposts_by_rect?x0=50&y0=120&x1=55&y1=140`)
      .then(res => {
        const data = res.data;
        data_pos=data;
        console.log(res.data[0]);
        for(let i = 0; i < data.length; i++){
          let color = "";
          let html = "";
          switch (res.data[i]['post_type']){
            case 0:
              color = "#3083ff";
              html = `<h3><b>Номер гидропоста:</b> `+data[i]['post_id']+`</h3><p><b>Река:</b> `+data[i]['river']+`</p><p><b>Регион:</b> `+data[i]['region']+`</p></p>`
              break;
            case 1:
              color = "#E80000";
              html = `<h3><b>Номер метеопоста:</b> `+data[i]['post_id']+`</h3><p><b>Регион:</b> `+data[i]['river']+`</p></p>`
              break;
  
          }
          const marker1 = new mapboxgl.Marker({ "color": color, "scale": 0.7 })
          .setLngLat([data[i]['longitude'], data[i]['latitude']])
          .setPopup(
            new mapboxgl.Popup({ offset: 10 }) // add popups
            .setHTML(
            html
            ))
          .addTo(map);

        }
      })

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