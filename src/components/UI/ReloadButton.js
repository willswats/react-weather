import classes from './ReloadButton.module.css';

const ReloadButton = ({ reloadHandler }) => {
  return (
    <div className={classes['reload-container']}>
      <button
        className={classes['reload-container__btn']}
        onClick={reloadHandler}
      >
        &#8635;
      </button>
    </div>
  );
};

export default ReloadButton;
