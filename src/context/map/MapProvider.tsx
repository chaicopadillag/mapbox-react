import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { useReducer, FC, useContext, useEffect } from 'react';
import { MapContext, PlacesContext } from '..';
import addresApi from '../../api/addresApi';
import { AddresResponse } from '../../interfaces/IAddressInterface';
import { mapReducer, MapStateType } from '../../reducer/mapReducer';

const initialState: MapStateType = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

type MapProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const MapProvider: FC<MapProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];
    for (const place of places) {
      const [lng, lat] = place.center;
      newMarkers.push(
        new Marker()
          .setPopup(
            new Popup().setHTML(`
          <h6>${place.text_es}</h6>
          <p className='text-muted fs-6'>${place.place_name_es}</p>
          `)
          )
          .setLngLat([lng, lat])
          .addTo(state.map!)
      );
    }
    dispatch({
      type: 'SET_MARKERS',
      payload: newMarkers,
    });
  }, [places]);

  const setMap = (map: Map) => {
    new Marker({
      color: '#61DAFB',
    })
      .setLngLat(map.getCenter())
      .setPopup(new Popup().setHTML('<h3>Hola!, estoy aquí</h3>'))
      .addTo(map);
    dispatch({
      type: 'SET_MAP',
      payload: map,
    });
  };

  const getRouteBetWeenPoints = async (start: [number, number], end: [number, number]) => {
    const { data } = await addresApi.get<AddresResponse>(`/${start.join(',')};${end.join(',')}`);

    const { distance, duration, geometry } = data.routes[0];
    const { coordinates: coords } = geometry;

    let kmts = distance / 1000;
    kmts = Math.round(kmts * 100);
    kmts /= 100;

    const mints = Math.round(duration / 60);
    console.log({ kmts, mints });

    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }
    state.map?.fitBounds(bounds, { padding: 100 });

    // Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    // Remove pline existents
    if (state.map?.getLayer('RouteString')) {
      state.map?.removeLayer('RouteString');
      state.map?.removeSource('RouteString');
    }

    state.map?.addSource('RouteString', sourceData);

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#61DAFB',
        'line-width': 4,
      },
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBetWeenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
