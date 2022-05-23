import { MEASUREMENTS } from '../App';

const convertWeather = (weather, number, measurement) => {
  switch (weather) {
    case 'rain':
      if (measurement === MEASUREMENTS.METRIC) {
        return `${number}mm`;
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        if (number > 0) {
          return `${(number / 25.4).toFixed(2)}in`;
        } else {
          return `${number}in`;
        }
      }
      break;
    case 'wind':
      if (measurement === MEASUREMENTS.METRIC) {
        return `${Math.round(number)}m/s`;
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        return `${Math.round(number)}mph`;
      }
      break;
    case 'visibility':
      if (measurement === MEASUREMENTS.METRIC) {
        return `${Math.round(number / 1000)}km`;
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        return `${Math.round((number / 1000) * 0.6213712)}mi`;
      }
      break;
    case 'pressure':
      if (measurement === MEASUREMENTS.METRIC) {
        return `${number}mb`;
      } else if (measurement === MEASUREMENTS.IMPERIAL) {
        return `${(number * 0.0295).toFixed(2)}in`;
      }
      break;
    default:
      return;
  }
};
export default convertWeather;
