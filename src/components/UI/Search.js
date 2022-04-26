import classes from './Search.module.css';

const Search = ({ submitHandler, changeHandler, value, placeholder }) => {
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        onChange={changeHandler}
        placeholder={placeholder}
        value={value}
        className={classes['search']}
      ></input>
    </form>
  );
};

export default Search;
