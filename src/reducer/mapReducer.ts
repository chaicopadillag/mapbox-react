import { Map, Marker } from 'mapbox-gl';

export type MapStateType = {
  isMapReady: boolean;
  markers: Marker[];
  map?: Map;
};

type MapActionType =
  | {
      type: 'SET_MAP';
      payload: Map;
    }
  | {
      type: 'SET_MARKERS';
      payload: Marker[];
    };

export const mapReducer = (state: MapStateType, action: MapActionType): MapStateType => {
  switch (action.type) {
    case 'SET_MAP':
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };
    case 'SET_MARKERS':
      return {
        ...state,
        markers: action.payload,
      };

    default:
      return state;
  }
};
