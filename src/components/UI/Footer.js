import classes from './Footer.module.css';

const Footer = ({ body }) => {
  return <footer className={classes['footer']}>{body}</footer>;
};

export default Footer;
