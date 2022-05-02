const askForLatLon = () => {
  return new Promise((resolve, reject) => {
    const success = (position) => {
      resolve({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    const failure = (error) => {
      reject(error);
    };

    navigator.geolocation.getCurrentPosition(success, failure);
  });
};

export default askForLatLon;
