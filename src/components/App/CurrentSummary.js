import { useState } from 'react';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import WarningButton from '../UI/Buttons/WarningButton';

import capitaliseFirstLetters from '../../helpers/capitaliseFirstLetters';

import classes from './CurrentSummary.module.css';
import getTime from '../../helpers/getTime';
import AlertsModal from './AlertsModal';

const CurrentSummary = ({ weather, location }) => {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
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

    weather.alerts = [
      {
        sender_name: 'NWS Tulsa',
        event: 'Heat Advisory',
        start: 1597341600,
        end: 1597366800,
        description:
          '...HEAT ADVddddddISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible.',
        tags: ['Extreme temperature value'],
      },
      {
        sender_name: 'NWS Tulsa',
        event: 'Heat Advisory',
        start: 1597341600,
        end: 1597366800,
        description:
          '...HEAT AsefgwgDVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible.',
        tags: ['Extreme temperature value'],
      },
    ];

    return (
      <Card
        title={`${name}, ${country} at ${time}`}
        body={
          <div className="horizontal">
            <div className={classes['start']}>
              <p className={classes['start__temperature']}>
                {temperature}&#176;
              </p>
              <p className={classes['start__description']}>{description}</p>
              <WarningButton alerts={weather.alerts} clickHandler={showModal} />
              {modal === true && (
                <AlertsModal
                  alerts={weather.alerts}
                  timezone={weather.timezone}
                  overlayClickHandler={hideModal}
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
