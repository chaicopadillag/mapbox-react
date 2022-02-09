import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';

export const ButtonLocation = () => {
  const { userLocation } = useContext(PlacesContext);
  const { isMapReady, map } = useContext(MapContext);

  const setLocation = () => {
    if (isMapReady && userLocation && map) {
      map.flyTo({
        center: userLocation,
        zoom: 14,
      });
    }
  };

  return (
    <button
      className='btn btn-primary'
      style={{
        position: 'absolute',
        top: '40px',
        right: '10px',
        zIndex: 1,
      }}
      onClick={setLocation}
    >
      Mi Ubicación
    </button>
  );
};
