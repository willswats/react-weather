import classes from './ReloadButton.module.css';

const ReloadButton = ({ reloadHandler }) => {
  return (
    <>
      <button className={classes['reload-btn']} onClick={reloadHandler}>
        &#8635;
      </button>
    </>
  );
};

export default ReloadButton;
