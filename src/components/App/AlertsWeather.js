import getTime from '../../helpers/getTime';
import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import Card from '../UI/Card';

import classes from './AlertsWeather.module.css';

const AlertsWeather = ({ weather }) => {
  if (weather.alerts !== undefined && weather.timezone !== undefined) {
    const alert = weather.alerts[0];

    const senderName = alert.sender_name;
    const eventName = capitaliseFirstLetters(alert.event);
    const start = getTime(alert.start, weather.timezone, 4);
    const end = getTime(alert.end, weather.timezone, 4);
    const description = alert.description;

    return (
      <Card
        title={`${eventName}!`}
        body={
          <div className={classes['alert']}>
            <p className={classes['text']}>{description}</p>
          </div>
        }
      />
    );
  }
};

export default AlertsWeather;
