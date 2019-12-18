import {events} from "../mocks/event";
import {MONTHS} from "../utils/common";
import AbstractComponent from "./abstract-component";

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

export default class Trip extends AbstractComponent {

  getTemplate() {
    return createTripTemplate();
  }
}
