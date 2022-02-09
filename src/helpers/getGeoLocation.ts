export const getGeoLocation = async (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (err) => {
        console.log('error al obtener la geolocalizacion: ', err);
        reject();
      }
    );
  });
};
