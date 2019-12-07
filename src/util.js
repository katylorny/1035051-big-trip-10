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
  const newArr = arr.filter(() => Math.random() > 0.5).slice(0, max);
  if (newArr.length === 0) {
    newArr.push(arr[0]);
  }
  return newArr;
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

export const makeCheckedArray = (arr) => {
  let checkedArray = [];
  let num = getRandomNumber(0, arr.length);
  arr.forEach((el, number) => {
    // number === num ? checkedArray.push(true) : checkedArray.push(false);
    if (number === num) {
      checkedArray.push(true);
    } else {
      checkedArray.push(false);
    }
  });
  return checkedArray;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const RENDER_POSITION = {
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`
};

export const render = (container, template, place) => {
  switch (place) {
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(template);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(template);
      break;
    case RENDER_POSITION.AFTEREND:
      container.after(template);
  }
};
