
import AbstractComponent from "./abstract-component";
import moment from 'moment';

const createTripTemplate = (model) => {
  const events = model.getFilteredPoints().sort((a, b) => a.startTime - b.startTime);
  const {city: cityStart, startTime: startTime} = events[0];
  const {city: cityEnd, endTime: endTime} = events[events.length - 1];
  let cityMid;
  if (events.length === 3) {
    cityMid = events[1].city;
  }

  return (
    `<div class="trip-info__main">
              <h1 class="trip-info__title">${cityStart} &mdash; ${cityMid ? cityMid : `...`} &mdash; ${cityEnd}</h1>

              <p class="trip-info__dates">${moment(startTime).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${moment(endTime).format(`MMM DD`)}</p>
            </div>`
  );
};

export default class Trip extends AbstractComponent {
  constructor(model) {
    super();
    this._model = model;
  }

  getTemplate() {
    console.log("модель create trip", this._model);
    return createTripTemplate(this._model);
  }
}
