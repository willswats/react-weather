import classes from './Search.module.css';

import { ReactComponent as IconSearch } from '../../svgs/search-line.svg';

const Search = ({ submitHandler, changeHandler, value, placeholder }) => {
  return (
    <form className={classes['form']} onSubmit={submitHandler}>
      <IconSearch className={classes['icon']} />
      <input
        type="text"
        onChange={changeHandler}
        value={value}
        placeholder={placeholder}
        className={classes['search']}
      />
    </form>
  );
};
export default Search;
