import classes from './Nav.module.css';

const Nav = ({ left, middle, right }) => {
  return (
    <div className={classes['nav']}>
      <div className={classes['nav__left']}>{left}</div>
      <div className={classes['nav__middle']}>{middle}</div>
      <div className={classes['nav__right']}>{right}</div>
    </div>
  );
};

export default Nav;
