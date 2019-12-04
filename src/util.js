export const getRandomNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

export const getRandomArrayElement = (arr) => {
  const element = getRandomNumber(0, arr.length);
  return arr[element];
};

export const getRandomArrayElements = (arr, max) => { // тут может выпасть ни одного!
  return arr
    .filter(() => Math.random() > 0.5)
    .slice(0, max);
};

