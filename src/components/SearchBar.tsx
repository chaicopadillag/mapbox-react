import { useRef, useContext } from 'react';
import { SearchResults } from '.';
import { PlacesContext } from '../context';

export const SearchBar = () => {
  const debounceRef = useRef<number>();
  const { searchPlacesByTerm } = useContext(PlacesContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      const { value } = e.target;
      searchPlacesByTerm(value);
    }, 350);
  };

  return (
    <div
      className='card'
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1,
        width: '300px',
      }}
    >
      <input className='form-control me-2' type='search' placeholder='Buscar lugar' aria-label='Search' onChange={handleChange} />
      <SearchResults />
    </div>
  );
};
