const getTime = (hoursToAdd = 0, digits) => {
  const hourMilliseconds = 3600000;
  const time = new Date(Date.now() + hoursToAdd * hourMilliseconds);
  let convertedTime = time.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  if (digits === 2) {
    convertedTime = time.toLocaleTimeString('en-GB', {
      hour: '2-digit',
    });
  }

  return convertedTime;
};

export default getTime;
