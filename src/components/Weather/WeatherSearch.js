import { ACTIONS, MEASUREMENTS } from '../../App';

import { useState, useEffect } from 'react';

import Search from '../UI/Search/Search';
import List from '../UI/Search/List';

import { fetchGeocodingData } from '../../helpers/api';

const WeatherSearch = ({ measurement, dispatch, setWeatherData }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const submitHandler = async (event) => {
    event.preventDefault();
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
    // Reset state
    setSearch('');
    setSuggestions([]);
  };

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.length > 0) {
        let dataArr = [];
        const data = await fetchGeocodingData(search);
        for (let i = 0; i < data.length; i++) {
          dataArr.push({ name: data[i].name, country: data[i].country });
        }
        setSuggestions(dataArr);
      } else {
        setSuggestions([]);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <Search
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        value={search}
        placeholder={'Search City'}
        list={<List items={suggestions} />}
      />
    </>
  );
};

export default WeatherSearch;
