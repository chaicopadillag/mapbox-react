import React, { useContext, useLayoutEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { AppLoading, ButtonLocation, ReactLogo, SearchBar } from '.';
import { MapContext, PlacesContext } from '../context';

export const MapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new mapboxgl.Map({
        container: mapRef.current!, // container ID
        style: 'mapbox://styles/mapbox/light-v10', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });
      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) return <AppLoading />;

  return (
    <div
      ref={mapRef}
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#d3d3d3',
        left: 0,
        top: 0,
        position: 'fixed',
      }}
    >
      <SearchBar />
      <div
        className='badge rounded-pill bg-dark'
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1,
        }}
      >
        {userLocation?.join(',')}
      </div>
      <ButtonLocation />
      <ReactLogo />
    </div>
  );
};
