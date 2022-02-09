import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token: 'pk.eyJ1IjoiY2hhaWNvcGFkaWxsYWciLCJhIjoiY2tseTUwcWo2MW8ycDJwbXM4ZWF1YmdhZCJ9.bMXMmby68b1jKvZfqMqOzw',
  },
});
