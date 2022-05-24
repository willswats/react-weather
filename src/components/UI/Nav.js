import classes from './Nav.module.css';

const Nav = ({ left, middle, right }) => {
  return (
    <nav className={classes['nav']}>
      <div className={classes['nav__left']}>{left}</div>
      <div className={classes['nav__middle']}>{middle}</div>
      <div className={classes['nav__right']}>{right}</div>
    </nav>
  );
};

export default Nav;
