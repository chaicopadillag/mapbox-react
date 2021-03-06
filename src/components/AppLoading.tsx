import React from 'react';

export const AppLoading = () => {
  return (
    <div className='d-flex justify-content-center mt-4'>
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};
