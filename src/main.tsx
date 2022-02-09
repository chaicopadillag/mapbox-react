import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import './index.css';
import MapsApp from './MapsApp';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhaWNvcGFkaWxsYWciLCJhIjoiY2tseTUwcWo2MW8ycDJwbXM4ZWF1YmdhZCJ9.bMXMmby68b1jKvZfqMqOzw';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');
}

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);
