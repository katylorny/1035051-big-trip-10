import {TYPES_STAY} from "../constants";
import {castTimeDateFormat, timeDuration} from "../utils/common";
import AbstractComponent from "./abstract-component";
import moment from 'moment';

const createOffersTemplate = (array) => {
  return array.map(({title, price}) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
       </li>`
    );
  }).join(`\n`);
};


export const createCardTemplate = (cardObject) => {
  const {type, city, price, startTime, endTime, options} = cardObject;
  const duration = timeDuration(startTime, endTime);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  return (

    `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon"> 
                    </div>
                    <h3 class="event__title">${type} ${TYPES_STAY.includes(type) ? `in` : `to`} ${city}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="${startTime}">${moment(startTime).format(`HH:mm`)}</time> 
                        &mdash;
                        <time class="event__end-time" datetime="${endTime}">${moment(endTime).format(`HH:mm`)}</time>
                      </p>
                      <p class="event__duration">${days === 0 ? `` : `${castTimeDateFormat(days)}D`} 
                         ${days + hours === 0 ? `` : `${castTimeDateFormat(hours)}H`} ${castTimeDateFormat(minutes)}M </p> 
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

export default class Card extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createCardTemplate(this._event);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
