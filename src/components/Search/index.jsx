// Assets
import SvgSearch from 'assets/search-line.svg?react';

import styles from './styles.module.css';

export const Search = ({
  submitHandler,
  changeHandler,
  value,
  placeholder,
}) => {
  return (
    <form className={styles['form']} onSubmit={submitHandler}>
      <SvgSearch className={styles['svg']} />
      <input
        type="text"
        onChange={changeHandler}
        value={value}
        placeholder={placeholder}
        className={styles['search']}
      />
    </form>
  );
};
