import React from 'react';
import Map from './components/Map';
import Hud from './components/Hud';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  return (
    <div>
      <Map />
      <Hud />
    </div>
  );
}

export default App;