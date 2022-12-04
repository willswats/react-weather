import { useState } from 'react';

// Components
import { Card, Modal, WarningButton } from 'components';

// Utils
import { capitaliseFirstLetters, getTime } from 'features/weather';

// Assets
import { ReactComponent as IconCross } from 'assets/close-line.svg';

import styles from './styles.module.css';

export const WeatherAlertsButton = ({ weather }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  if (weather.alerts !== undefined && weather.timezone !== undefined) {
    const { alerts, timezone } = weather;

    return (
      <>
        <WarningButton clickHandler={showModal} alerts={weather.alerts} />
        {modalVisible === true && (
          <Modal
            hideHandler={hideModal}
            body={
              <Card
                title={'Current Alerts'}
                end={
                  <IconCross onClick={hideModal} className={styles['cross']} />
                }
                body={alerts.map((alert, index) => {
                  const eventName = capitaliseFirstLetters(alert.event);
                  const start = getTime(alert.start, timezone, 4);
                  const end = getTime(alert.end, timezone, 4);

                  return (
                    <p key={index} className={styles['alert']}>
                      {eventName} ({start} - {end})
                    </p>
                  );
                })}
              />
            }
          />
        )}
      </>
    );
  }
};
