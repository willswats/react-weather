import classes from './Modal.module.css';

import { ReactComponent as IconCross } from '../../svgs/close-line.svg';

const Overlay = ({ hideHandler, body }) => {
  return (
    <>
      <div className={classes['cross']} onClick={hideHandler}>
        <IconCross />
      </div>
      <div onClick={hideHandler} className={classes['overlay']} />
      <div className={classes['body']}>{body}</div>
    </>
  );
};

export default Overlay;
