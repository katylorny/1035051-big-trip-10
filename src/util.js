export const MS_MIN = 60000;
export const MS_HOUR = 3600000;
export const MS_DAY = 86400000;

export const MONTHS = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

export const calculateTimeDifference = (firstDate, secondDate) => {
  let diff = secondDate - firstDate;
  let daysAmount = Math.floor(diff / MS_DAY);
  diff -= daysAmount * MS_DAY;
  let hoursAmount = Math.floor(diff / MS_HOUR);
  diff -= hoursAmount * MS_HOUR;
  let minutesAmount = diff / MS_MIN;
  diff -= minutesAmount * MS_MIN;
  return [daysAmount, hoursAmount, minutesAmount, diff];
};

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

export const castTimeDateFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatDateTime = (date) => {
  const day = castTimeDateFormat(date.getDate());
  const month = date.getMonth();
  const year = date.getFullYear();

  const hours = castTimeDateFormat(date.getHours());
  const minutes = castTimeDateFormat(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

