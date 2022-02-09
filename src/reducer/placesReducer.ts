import { Feature } from '../interfaces/IPlacesInterface';

export type PlaceStateType = {
  isLoading: boolean;
  userLocation?: [number, number];
  isPlacesLoading: boolean;
  places: Feature[];
};

type PlacesActionType =
  | {
      type: 'SET_USER_LOCATION';
      payload: [number, number];
    }
  | {
      type: 'SET_PLACES';
      payload: Feature[];
    }
  | {
      type: 'SET_PLACES_LOADING';
    };

export const placeReducer = (placeState: PlaceStateType, action: PlacesActionType): PlaceStateType => {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return {
        ...placeState,
        isLoading: false,
        userLocation: action.payload,
      };
    case 'SET_PLACES':
      return {
        ...placeState,
        isPlacesLoading: false,
        places: action.payload,
      };
    case 'SET_PLACES_LOADING':
      return {
        ...placeState,
        isPlacesLoading: true,
        places: [],
      };
    default:
      return placeState;
  }
};
