import { useState } from 'react';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import ModalButton from '../UI/Buttons/ModalButton';

import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './CurrentSummary.module.css';
import getTime from '../../helpers/getTime';
import AlertsModal from './Modals/AlertsModal';

const CurrentSummary = ({ weather, location }) => {
  const [alertsModal, setAlertsModal] = useState(false);

  const showAlertsModal = () => {
    setAlertsModal(true);
  };

  const hideAlertsModal = () => {
    setAlertsModal(false);
  };

  if (
    weather !== undefined &&
    weather.current !== undefined &&
    weather.timezone !== undefined &&
    location !== undefined &&
    location.name !== undefined &&
    location.country !== undefined
  ) {
    const { current } = weather;
    const { name, country } = location;

    const temperature = Math.round(current.temp);
    const description = capitaliseFirstLetters(current.weather[0].description);
    const icon = current.weather[0].icon;

    const time = getTime(current.dt, weather.timezone, 4);

    return (
      <Card
        title={`${name}, ${country} at ${time}`}
        button={
          <ModalButton
            type="warning"
            clickHandler={showAlertsModal}
            alerts={weather.alerts}
          />
        }
        body={
          <div className="horizontal">
            <div className={classes['start']}>
              <p className={classes['start__temperature']}>
                {temperature}&#176;
              </p>
              <p className={classes['start__description']}>{description}</p>
              {alertsModal === true && (
                <AlertsModal
                  alerts={weather.alerts}
                  timezone={weather.timezone}
                  hideHandler={hideAlertsModal}
                />
              )}
            </div>
            <div className={classes['end']}>
              <img
                className={classes['end__img']}
                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                alt={`${description}`}
              ></img>
            </div>
          </div>
        }
      />
    );
  } else return <Card title={<LoadingSpinner />} body={<LoadingSpinner />} />;
};

export default CurrentSummary;
