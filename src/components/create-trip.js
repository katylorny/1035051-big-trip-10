import AbstractComponent from "./abstract-component";
import moment from 'moment';

const createTripTemplate = (model) => {
  const events = model.getAllPoints().sort((a, b) => a.startTime - b.startTime);

  if (!events[0]) {
    return ``;
  }

  const {city: cityStart, startTime: startTime} = events[0];
  const {city: cityEnd, endTime: endTime} = events[events.length - 1];
  let midElement;

  switch (events.length) {
    case 1:
      midElement = ``;
      break;
    case 2:
      midElement = ``;
      break;
    case 3:
      midElement = `${events[1].city} &mdash;`;
      break;
    default:
      midElement = `... &mdash;`;
      break;
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${cityStart} &mdash; ${midElement} ${cityEnd}</h1>

              <p class="trip-info__dates">${moment(startTime).format(`MMM DD`)}&nbsp;&mdash;&nbsp;${moment(endTime).format(`MMM DD`)}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
            </p>
     </section>`
  );
};

export default class Trip extends AbstractComponent {
  constructor(model) {
    super();
    this._model = model;
  }

  getTemplate() {
    return createTripTemplate(this._model);
  }
}
