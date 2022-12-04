// Assets
import { ReactComponent as IconSearch } from 'assets/search-line.svg';

import styles from './styles.module.css';

export const Search = ({
  submitHandler,
  changeHandler,
  value,
  placeholder,
}) => {
  return (
    <form className={styles['form']} onSubmit={submitHandler}>
      <IconSearch className={styles['icon']} />
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
