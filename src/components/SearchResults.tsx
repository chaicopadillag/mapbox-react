import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { Feature } from '../interfaces/IPlacesInterface';
import { LoadingPlaces } from './';

export const SearchResults = () => {
  const [activeResult, setActiveResult] = useState('');
  const { isPlacesLoading, places, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetWeenPoints } = useContext(MapContext);

  const handleCenterMap = (place: Feature) => {
    setActiveResult(place.id);
    const [lng, lat] = place.center;
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  const handleGetRoute = (place: Feature) => {
    if (!userLocation) return;
    const [lng, lat] = place.center;
    getRouteBetWeenPoints(userLocation, [lng, lat]);
  };

  if (isPlacesLoading) return <LoadingPlaces />;

  return (
    <div className='list-group'>
      {places.map((place) => (
        <a href='#' className={`list-group-item list-group-item-action ${place.id === activeResult ? 'active' : ''}`} key={place.id} onClick={() => handleCenterMap(place)}>
          <h6>{place.text_es}</h6>
          <p className={`fs-6 ${place.id === activeResult ? 'text-white' : 'text-muted'}`}>{place.place_name_es}</p>
          <button onClick={() => handleGetRoute(place)} className={`btn btn-sm ${place.id === activeResult ? 'btn-outline-light' : 'btn-outline-primary'}`}>
            Direcciones
          </button>
        </a>
      ))}
    </div>
  );
};
