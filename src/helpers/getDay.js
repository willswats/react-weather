const getDay = (timeZone, daysToAdd = 0) => {
  const dayMilliseconds = 86400000;
  const time = Date.now() + daysToAdd * dayMilliseconds;
  const day = new Date(time).toLocaleString('en-gb', {
    weekday: 'short',
    timeZone: timeZone,
  });
  return day;
};

export default getDay;
