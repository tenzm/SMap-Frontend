import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import axios from 'axios';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.661557, 41.893748],
      zoom: 10.7
    });

    

    axios.get(`http://localhost:8000/get_hydroposts_by_rect?x0=45&y0=120&x1=55&y1=140`)
      .then(res => {
        const data = res.data;
        console.log(res.data[0]);
        for(let i = 0; i < data.length; i++){
          const marker1 = new mapboxgl.Marker({ "color": "#3083ff", "scale": 0.7 })
          .setLngLat([data[i]['longitude'], data[i]['latitude']])
          .setPopup(
            new mapboxgl.Popup({ offset: 10 }) // add popups
            .setHTML(
            `<h3><b>Номер гидропоста:</b> `+data[i]['post_id']+`</h3><p><b>Река:</b> `+data[i]['river']+`</p><p><b>Река:</b> `+data[i]['region']+`</p></p>`
            ))
          .addTo(map);
        }
      })

      mapboxgl.Point()

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