const getCurrentTime = () => {
  const date = new Date();
  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return time;
};

export default getCurrentTime;
