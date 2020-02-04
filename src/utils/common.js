import moment from 'moment';

export const castTimeDateFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};


export const timeDuration = (startTime, endTime) => {
  const a = moment(startTime);
  const b = moment(endTime);
  const duration = moment.duration(b - a);

  return duration;
};

export const reformatDate = (dateAsString) => {
  const dateAsMoment = moment(dateAsString, `DD/MM/YYYY HH:mm`).format(`YYYY,MM,DD,HH,mm`);
  const dateAsArray = dateAsMoment.split(`,`).map((it) => parseInt(it, 10));
  dateAsArray[1] -= 1;

  return new Date(...dateAsArray);
};
