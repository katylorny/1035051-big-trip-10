import {CITIES} from "../mocks/event";
import {TYPES_MOVE} from "../mocks/event";
import {TYPES_STAY} from "../mocks/event";
import {createElement, formatDateTime} from "../util";

const createTypesTemplate = (arr) => {
  return (
    arr.map((typeOfEvent) => {
      return (
        `<div class="event__type-item">
      <input id="event-type-${typeOfEvent}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeOfEvent}">
      <label class="event__type-label  event__type-label--${typeOfEvent}" for="event-type-${typeOfEvent}-1">${typeOfEvent}</label>
     </div>`
      );
    }).join(`\n`)
  );
};

const createOfferTemplate = (arr) => {
  return arr.map((offer) => {
    const {name: offerName, type: offerType, cost: offerPrice} = offer;
    return (
      `<div class="event__offer-selector">
       <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerType}-1" type="checkbox" name="event-offer-${offerType}" checked>
       <label class="event__offer-label" for="event-offer-${offerType}-1">
         <span class="event__offer-title">${offerName}</span>
         &plus;
         &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
       </label>
     </div>`
    );
  }).join(`\n`);
};

const createCitiesListTemplate = CITIES.map((el) => {
  return `<option value="${el}"></option>`;
}).join(`\n`);

const createPhotosTemplate = (array) => {
  return array.map((photo) => {
    return (
      `<img class="event__photo" src="${photo}" alt="Event photo">`
    );
  }).join(`\n`);
};

const createEditEventTemplate = (event) => {

  const {type, city, photos, description, price, startTime, endTime, options} = event;
  // console.log(event)
  return (
    `<form class="event  event--edit" action="#" method="post">
                    <header class="event__header">
                      <div class="event__type-wrapper">
                        <label class="event__type  event__type-btn" for="event-type-toggle-1">
                          <span class="visually-hidden">Choose event type</span>
                          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                        </label>
                        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                        <div class="event__type-list">
                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Transfer</legend>

                            ${createTypesTemplate(TYPES_MOVE)}

                          </fieldset>

                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Activity</legend>

                            ${createTypesTemplate(TYPES_STAY)}

                          </fieldset>
                        </div>
                      </div>


                      <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                          ${type} ${TYPES_STAY.includes(type) ? `in` : `to`}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
                        <datalist id="destination-list-1">
                          ${createCitiesListTemplate}
                        </datalist>
                      </div>

                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                          From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateTime(startTime)}">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                          To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateTime(endTime)}">
                      </div>

                      <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                          <span class="visually-hidden">Price</span>
                          &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                      </div>

                      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                      <button class="event__reset-btn" type="reset">Delete</button>

                      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
                      <label class="event__favorite-btn" for="event-favorite-1">
                        <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                        </svg>
                      </label>

                      <button class="event__rollup-btn" type="button">
                        <span class="visually-hidden">Open event</span>
                      </button>
                    </header>

                    <section class="event__details">

                      <section class="event__section  event__section--offers">
                        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                        <div class="event__available-offers">
                          ${createOfferTemplate(options)}
                        </div>
                      </section>

                      <section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">
                        
                        ${description}
                        
                        </p>

                        <div class="event__photos-container">
                          <div class="event__photos-tape">
                            ${createPhotosTemplate(photos)}
                          </div>
                        </div>
                      </section>
                    </section>
                  </form>`
  );
};// взяла edit-event

export default class EditEvent {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createEditEventTemplate(this._event);
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
