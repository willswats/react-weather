const getDay = (daysToAdd = 0) => {
  const dayMilliseconds = 86400000;
  const time = Date.now() + daysToAdd * dayMilliseconds;
  const day = new Date(time).toLocaleString('en-gb', {
    weekday: 'short',
  });
  return day;
};

export default getDay;
