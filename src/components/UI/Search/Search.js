import { useState, useRef, useEffect } from 'react';

import classes from './Search.module.css';

const Search = ({ submitHandler, changeHandler, value, placeholder, list }) => {
  const formRef = useRef();
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    const mouseDownHandler = (event) => {
      if (formRef.current && formRef.current.contains(event.target)) {
        setShowList(true);
      } else {
        setShowList(false);
      }
    };
    document.addEventListener('mousedown', mouseDownHandler);
    return () => {
      document.removeEventListener('mousedown', mouseDownHandler);
    };
  }, []);

  return (
    <form ref={formRef} onSubmit={submitHandler}>
      <input
        type="text"
        onChange={changeHandler}
        value={value}
        placeholder={placeholder}
        className={classes['search']}
      />
      {showList && list}
    </form>
  );
};
export default Search;
