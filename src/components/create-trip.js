import {events} from "../mocks/event";
import {createElement, MONTHS} from "../util";

const createTripTemplate = () => {
  const {city: cityStart, startTime: startTime} = events[0];
  const {city: cityEnd, endTime: endTime} = events[events.length - 1];
  let cityMid;
  if (events.length === 3) {
    cityMid = events[1].city;
  }

  return (
    `<div class="trip-info__main">
              <h1 class="trip-info__title">${cityStart} &mdash; ${cityMid ? cityMid : `...`} &mdash; ${cityEnd}</h1>

              <p class="trip-info__dates">${MONTHS[startTime.getMonth()]} ${startTime.getDate()}&nbsp;&mdash;&nbsp;${MONTHS[endTime.getMonth()]} ${endTime.getDate()}</p>
            </div>`
  );
};

export default class Trip {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
