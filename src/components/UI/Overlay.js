import classes from './Overlay.module.css';

const Overlay = ({ clickHandler }) => {
  return <div onClick={clickHandler} className={classes['overlay']} />;
};

export default Overlay;
