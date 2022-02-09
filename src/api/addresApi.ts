import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: 'pk.eyJ1IjoiY2hhaWNvcGFkaWxsYWciLCJhIjoiY2tseTUwcWo2MW8ycDJwbXM4ZWF1YmdhZCJ9.bMXMmby68b1jKvZfqMqOzw',
  },
});
