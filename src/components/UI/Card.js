import classes from './Card.module.css';

const Card = ({ title, body, error, key }) => {
  return (
    <div className={classes['card']} key={key}>
      <div className={classes['card__top']}>
        <h1 className={classes['card__title']}>{title}</h1>
      </div>
      <div className={classes['card__body']}>
        {body}
        {error && <p className={classes['card__error']}>{error}</p>}
      </div>
    </div>
  );
};

export default Card;
