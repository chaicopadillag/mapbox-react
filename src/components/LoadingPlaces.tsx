export const LoadingPlaces = () => {
  return (
    <ul className='list-group p-4'>
      <p aria-hidden='true'>
        <span className='placeholder col-12' />
        <span className='placeholder col-12' />
        <span className='placeholder col-12' />
      </p>
      <a href='#' tabIndex={-1} className='btn btn-outline-primary btn-sm disabled placeholder col-4' aria-hidden='true' />
    </ul>
  );
};
