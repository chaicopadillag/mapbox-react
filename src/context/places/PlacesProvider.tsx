import { FC, useEffect, useReducer } from 'react';
import { api } from '../../api/searchApi';
import { getGeoLocation } from '../../helpers';
import { Feature, PlacesResponse } from '../../interfaces/IPlacesInterface';
import { placeReducer, PlaceStateType } from '../../reducer/placesReducer';
import { PlacesContext } from './PlacesContext';

type placeProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const initialState: PlaceStateType = {
  isLoading: true,
  userLocation: undefined,
  isPlacesLoading: false,
  places: [],
};

export const PlacesProvider: FC<placeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(placeReducer, initialState);

  useEffect(() => {
    getGeoLocation().then((userLocation) => {
      dispatch({
        type: 'SET_USER_LOCATION',
        payload: userLocation,
      });
    });
  }, []);

  const searchPlacesByTerm = async (query: string) => {
    if (query.length === 0) {
      dispatch({ type: 'SET_PLACES', payload: [] });
      return [];
    }
    if (state.userLocation === undefined) return [];

    dispatch({
      type: 'SET_PLACES_LOADING',
    });

    const res = await api.get<PlacesResponse>(`${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),
      },
    });

    dispatch({
      type: 'SET_PLACES',
      payload: res.data.features,
    });
    // return res.data.features;
  };
  return <PlacesContext.Provider value={{ ...state, searchPlacesByTerm }}>{children}</PlacesContext.Provider>;
};
