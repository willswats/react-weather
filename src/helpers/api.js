export const fetchWeatherData = async (lat, lon, units) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=${units}`
  );
  const data = await response.json();

  return data;
};

export const fetchReverseGeocodingData = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  );
  const data = await response.json();

  return data;
};

export const fetchGeocodingData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  );
  const data = await response.json();

  return data;
};
