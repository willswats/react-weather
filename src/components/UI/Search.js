import classes from './Search.module.css';

const Search = ({ submitHandler, changeHandler, value, placeholder }) => {
  return (
    <form className={classes['form']} onSubmit={submitHandler}>
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
