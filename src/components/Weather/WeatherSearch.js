import { useState } from 'react';

import Search from '../UI/Search';

import { fetchGeocodingData } from '../../helpers/api';

const WeatherSearch = () => {
  const [search, setSearch] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    const location = await fetchGeocodingData(search);
    console.log(location);
    setSearch('');
  };

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Search
      submitHandler={submitHandler}
      changeHandler={changeHandler}
      value={search}
      placeholder={'City'}
    />
  );
};

export default WeatherSearch;
