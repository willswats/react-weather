import classes from './Modal.module.css';

const Overlay = ({ hideHandler, body }) => {
  return (
    <>
      <div onClick={hideHandler} className={classes['overlay']} />
      <div className={classes['body']}>{body}</div>
    </>
  );
};

export default Overlay;
