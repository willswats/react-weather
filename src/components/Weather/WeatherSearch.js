import { useState } from 'react';

import Search from '../UI/Search';

const WeatherSearch = ({ setDataThroughSearch }) => {
  const [search, setSearch] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    setDataThroughSearch(search);
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
      placeholder={'Search City'}
    />
  );
};

export default WeatherSearch;
