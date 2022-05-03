import { ACTIONS, MEASUREMENTS } from '../../App';

import { useState } from 'react';

import Search from '../UI/Search';

import { fetchGeocodingData } from '../../helpers/api';

const WeatherSearch = ({ dispatch, measurement, setWeatherData }) => {
  const [search, setSearch] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: { message: null },
    });
    try {
      const data = await fetchGeocodingData(search);
      dispatch({ type: ACTIONS.SET_LOCATION, payload: { data } });
      if (measurement === MEASUREMENTS.METRIC) {
        setWeatherData(data[0].lat, data[0].lon, 'metric');
      }
      if (measurement === MEASUREMENTS.IMPERIAL) {
        setWeatherData(data[0].lat, data[0].lon, 'imperial');
      }
      setSearch('');
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { message: `"${search}" is not a city.` },
      });
    }
  };

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Search
      submitHandler={submitHandler}
      changeHandler={changeHandler}
      value={search}
      placeholder={'Search City'}
    />
  );
};

export default WeatherSearch;
