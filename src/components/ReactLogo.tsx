import reactLogo from '../logo.svg';

export const ReactLogo = () => {
  return (
    <img
      src={reactLogo}
      alt='React Logo'
      style={{
        width: '130px',
        height: '130px',
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        zIndex: 1,
      }}
    />
  );
};
