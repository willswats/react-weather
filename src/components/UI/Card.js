import classes from './Card.module.css';

const Card = ({ title, end, body, error }) => {
  return (
    <div className={classes['card']}>
      <div className={classes['card__top']}>
        <h1 className={classes['card__title']}>{title}</h1>
        {end && <div>{end}</div>}
      </div>
      <div className={classes['card__body']}>
        {body}
        {error && <p className={classes['card__error']}>{error}</p>}
      </div>
    </div>
  );
};

export default Card;
