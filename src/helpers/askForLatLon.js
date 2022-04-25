const askForLatLon = () => {
  return new Promise((resolve, reject) => {
    const success = (position) => {
      resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    const failure = () => {
      reject('Failed to get location permisions');
    };

    navigator.geolocation.getCurrentPosition(success, failure);
  });
};

export default askForLatLon;
