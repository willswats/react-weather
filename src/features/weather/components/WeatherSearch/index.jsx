import { useState } from 'react';

// Components
import { Search } from 'components';

// Utils
import { fetchGeocodingData } from 'features/weather';

// Globals
import { ACTIONS, MEASUREMENTS } from 'features/weather';

export const WeatherSearch = ({ measurement, dispatch, setWeatherData }) => {
  const [search, setSearch] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    if (search.length < 1) {
      return;
    }

    // Reset state
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: { message: null },
    });
    dispatch({ type: ACTIONS.SET_LOCATION, payload: { data: [] } });
    // Set state
    try {
      const data = await fetchGeocodingData(search);
      dispatch({ type: ACTIONS.SET_LOCATION, payload: { data } });
      if (measurement === MEASUREMENTS.METRIC) {
        setWeatherData(data[0].lat, data[0].lon, 'metric');
      }
      if (measurement === MEASUREMENTS.IMPERIAL) {
        setWeatherData(data[0].lat, data[0].lon, 'imperial');
      }
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { message: `"${search}" is not a city.` },
      });
    }
    setSearch('');
  };

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Search
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        value={search}
        placeholder={'Search city'}
      />
    </>
  );
};
