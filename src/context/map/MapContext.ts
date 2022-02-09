import { Map } from 'mapbox-gl';
import { createContext } from 'react';

type MapContextType = {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
  getRouteBetWeenPoints: (start: [number, number], end: [number, number]) => Promise<void>;
};

export const MapContext = createContext<MapContextType>({} as MapContextType);
