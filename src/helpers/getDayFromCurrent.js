const getDayFromCurrent = (daysToAdd) => {
  const oneDayInMilliseconds = 86400000;
  const timeInMilliseconds = Date.now() + daysToAdd * oneDayInMilliseconds;
  const day = new Date(timeInMilliseconds).toLocaleString('en-gb', {
    weekday: 'long',
  });
  return day;
};

export default getDayFromCurrent;
