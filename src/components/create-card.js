// import {generatedEvents} from "../mocks/event";
import {TYPES_STAY} from "../mocks/event";
// import {TYPES_MOVE} from "../mocks/event";
import {calculateTimeDifference, createElement} from "../util";
import {castTimeDateFormat} from "../util";
// import {events} from "../mocks/event";
// import {OFFERS} from "../mocks/event";

const createOffersTemplate = (array) => {
  return array.map(({name, cost}) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${cost}</span>
       </li>`
    );
  }).join(`\n`);
};


export const createCardTemplate = (cardObject) => {
  const {type, city, price, startTime, endTime, options} = cardObject;
  const difference = calculateTimeDifference(startTime, endTime);
  const [days, hours, minutes] = difference;

  return (
    `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon"> 
                    </div>
                    <h3 class="event__title">${type} ${TYPES_STAY.includes(type) ? `in` : `to`} ${city}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="${startTime}">${castTimeDateFormat(startTime.getHours())}:${castTimeDateFormat(startTime.getMinutes())}</time> 
                        &mdash;
                        <time class="event__end-time" datetime="${endTime}">${castTimeDateFormat(endTime.getHours())}:${castTimeDateFormat(endTime.getMinutes())}</time>
                      </p>
                      <p class="event__duration">${days === 0 ? `` : `${castTimeDateFormat(days)}D`} ${days + hours === 0 ? `` : `${castTimeDateFormat(hours)}H`} ${castTimeDateFormat(minutes)}M </p> 
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${price}</span>
                    </p>
                     <h4 class="visually-hidden">Offers:</h4>
                    <ul class="event__selected-offers">
                      ${createOffersTemplate(options.slice(0, 3))}
                    </ul>

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`
  );
};// trip-events__item

// export const eventsMarkup = events.slice(1).map(createCardTemplate);


export default class Card {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createCardTemplate(this._event);

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
