const capitaliseFirstLetters = (sentence) => {
  sentence = sentence.split(' ');

  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].substr(1);
  }

  sentence = sentence.join(' ');

  return sentence;
};

export default capitaliseFirstLetters;
