import { createContext } from 'react';
import { Feature } from '../../interfaces/IPlacesInterface';

type PlacesContextType = {
  isLoading: boolean;
  userLocation?: [number, number];
  searchPlacesByTerm: (term: string) => void;
  isPlacesLoading: boolean;
  places: Feature[];
};

export const PlacesContext = createContext<PlacesContextType>({} as PlacesContextType);
