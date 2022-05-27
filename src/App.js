import React from 'react';
import Map from './components/Map';
import Hud from './components/Hud';
import Preview from './components/Preview';
import Graphics from './components/Graphics';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Preview/>} />
          <Route path="graphic">
            <Route path=":id" element={<Graphics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;