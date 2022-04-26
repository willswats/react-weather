import classes from './Search.module.css';

const Search = ({ submitHandler, changeHandler, placeholder }) => {
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        onChange={changeHandler}
        placeholder={placeholder}
        className={classes['search']}
      ></input>
    </form>
  );
};

export default Search;
