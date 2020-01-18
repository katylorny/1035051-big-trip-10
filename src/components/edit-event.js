import {CITIES} from "../mocks/event";
import {TYPES_MOVE} from "../mocks/event";
import {TYPES_STAY} from "../mocks/event";
import AbstractSmartComponent from "./abstract-smart-component";
import flatpickr from 'flatpickr';
import moment from 'moment';
import {getRandomNumber, reformatDate} from "../utils/common";
import {citiesWithDescription} from "../mocks/event";
import {typesWithOffers} from "../mocks/event";


const OPTION_NAME_PREFIX = `event-offer-`;

const createTypesTemplate = (arr, type) => {
  return (
    arr.map((typeOfEvent) => {
      return (
        `<div class="event__type-item">
          <input id="event-type-${typeOfEvent}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeOfEvent}" ${typeOfEvent === type ? `checked` : ``}>
          <label class="event__type-label  event__type-label--${typeOfEvent}" for="event-type-${typeOfEvent}-1">${typeOfEvent}</label>
         </div>`
      );
    }).join(`\n`)
  );
};

const createOfferTemplate = (arr) => {
  return arr.map((offer) => {
    const {name: offerName, type: offerType, cost: offerPrice, isChecked} = offer;
    return (
      `<div class="event__offer-selector">
       <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerType}-1" type="checkbox" name="event-offer-${offerType}" ${isChecked ? `checked` : ``}>
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

const createEditEventTemplate = (event, additionalEvent) => {

  const {isFavorite} = event;
  const {type, city, photos, description, price, startTime, endTime, options} = additionalEvent;

  return (
    `<li class="trip-events__item">
        <form class="event  event--edit" action="#" method="post">
                    <header class="event__header">
                      <div class="event__type-wrapper">
                        <label class="event__type  event__type-btn" for="event-type-toggle-1">
                          <span class="visually-hidden">Choose event type</span>
                          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                        </label>
                        <input  class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" name="event-rr">

                        <div class="event__type-list">
                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Transfer</legend>

                            ${createTypesTemplate(TYPES_MOVE, type)}

                          </fieldset>

                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Activity</legend>

                            ${createTypesTemplate(TYPES_STAY, type)}

                          </fieldset>
                        </div>
                      </div>


                      <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                          ${type} ${TYPES_STAY.includes(type) ? `in` : `to`}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1" autocomplete="off">
                        <datalist id="destination-list-1">
                          ${createCitiesListTemplate}
                        </datalist>
                      </div>

                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                          From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${moment(startTime).format(`DD/MM/YYYY HH:mm`)}">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                          To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${moment(endTime).format(`DD/MM/YYYY HH:mm`)}">
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

                      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
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
                  </form>
     </li>`
  );
};


export default class EditEvent extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this._additionalEvent = Object.assign({}, this._event);

    this._flatpickr = null;
    this._applyFlatpickr();

    this._submitHandler = null;
    this._deleteButtonHandler = null;
    this._rollupButtonClickHandler = null;

    this._subscribeOnEvents();

    this.reset = this.reset.bind(this);
  }

  getTemplate() {
    return createEditEventTemplate(this._event, this._additionalEvent);
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this._additionalEvent = Object.assign({}, this._event);
    this.rerender();
  };

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._rollupButtonClickHandler = handler;
  }

  setSubmitFormHandler(handler) {
    this.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault(); // TODO чтобы не отправлялось по нажатию enter
      handler();
    });
    this._submitHandler = handler;
  }

  setDeleteButtonHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteButtonHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {

    this.getElement().querySelector(`.event__favorite-icon`).addEventListener(`click`, handler);
  }

  recoveryListeners() {

    this.setSubmitFormHandler(this._submitHandler);
    this.setDeleteButtonHandler(this._deleteButtonHandler);
    this.setRollupButtonClickHandler(this._rollupButtonClickHandler);

    this._subscribeOnEvents();
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    const formData = new FormData(form);

    console.log(`...formData`, ...formData);
    return this._parseFormData(formData);
  }

  _parseFormData(formData) {

    const offers = Array.from(this.getElement().querySelectorAll(`.event__offer-selector`)).map((el) => {
      return {
        name: el.querySelector(`.event__offer-title`).textContent,
        type: el.querySelector(`.event__offer-checkbox`).name.substring(OPTION_NAME_PREFIX.length),
        cost: el.querySelector(`.event__offer-price`).textContent,
        isChecked: el.querySelector(`.event__offer-checkbox`).checked
      }
    });


    return {
      // id: String(new Date() + Math.random()),
      type: formData.get(`event-type`),
      city: formData.get(`event-destination`),
      description: this.getElement().querySelector(`.event__destination-description`).textContent,
      photos: Array.from(this.getElement().querySelectorAll(`.event__photo`)).map((photo) => photo.src),
      price: formData.get(`event-price`),
      startTime: reformatDate(formData.get(`event-start-time`)),
      endTime: reformatDate(formData.get(`event-end-time`)),
      options: offers,
      isFavorite: formData.has(`event-favorite`),
    }
  };

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {
      // console.log(`evt.target.textContent`, evt.target.textContent);
      if (evt.target.tagName === `LABEL`) {
        this._additionalEvent = Object.assign({}, this._additionalEvent, {
          type: evt.target.textContent,
        });

        const index = typesWithOffers.findIndex((el) => el.type === evt.target.textContent);
        this._additionalEvent = Object.assign({}, this._additionalEvent, {
          options: typesWithOffers[index].offers,
        });
        this.rerender();
      }
    });

    const destinationInput = element.querySelector(`.event__input--destination`);
    destinationInput.addEventListener(`focus`, () => {
      destinationInput.removeAttribute(`value`);
    });

    destinationInput.addEventListener(`change`, (evt) => {
      const selectedCityIndex = citiesWithDescription.findIndex((city) => city.city === evt.target.value);

      if (selectedCityIndex === -1) {
        this.rerender();
        return;
      }

      const selectedCity = citiesWithDescription[selectedCityIndex];

      this._additionalEvent = Object.assign({}, this._additionalEvent, {
        city: selectedCity.city,
        description: selectedCity.description,
        photos: selectedCity.photos,
      });
      this.rerender();
    })

  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const startDate = this.getElement().querySelector(`#event-start-time-1`);
    flatpickr(startDate, {
      // altInput: true,
      // allowInput: true,
      enableTime: true,
      dateFormat: `d/m/Y H:i`,
    });

    const endDate = this.getElement().querySelector(`#event-end-time-1`);
    flatpickr(endDate, {
      enableTime: true,
      dateFormat: `d/m/Y H:i`,
    });
  }
}
