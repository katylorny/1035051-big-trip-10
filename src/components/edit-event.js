import {TYPES_MOVE, TYPES_STAY} from "../constants";
import AbstractSmartComponent from "./abstract-smart-component";
import flatpickr from 'flatpickr';
import moment from 'moment';
import {MODES} from "../controllers/point-controller";
import StorageModel from "../models/storage-model";
import PointModel from "../models/point-model";

// const OPTION_NAME_PREFIX = `event-offer-`;

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

    const {title: offerName, price: offerPrice, isChecked} = offer;
    const offerType = offerName.toString().toLowerCase().split(` `).join(`-`);
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

const createCitiesListTemplate = (cities) => {
  return cities.map((el) => {
    return `<option value="${el}"></option>`;
  }).join(`\n`);
};

const createPhotosTemplate = (array) => {
  return array.map((photo) => {
    return (
      `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`
    );
  }).join(`\n`);
};

const createEditEventTemplate = (event, additionalEvent, mode) => {

  const {isFavorite} = event;
  const {type, city, description, photos, price, startTime, endTime, options} = additionalEvent;

  const cities = StorageModel.getCities();

  const allOptionsOfType = StorageModel.getOffersOfType(type);

  allOptionsOfType.forEach((option) => {
    const selectedOption = options.find((it) => it.title === option.title);
    option[`isChecked`] = !!selectedOption;
    if (selectedOption) {
      option[`price`] = selectedOption.price;

    }

  });

  const isDisabledSaveButton = (!price || !city);

  return (
    `<form class="event  event--edit ${mode === MODES.ADDING ? `trip-events__item` : ``}" action="#" method="post">
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
                          ${createCitiesListTemplate(cities)}
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
                      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabledSaveButton ? `disabled` : ``}>Save</button>
                      <button class="event__reset-btn" type="reset">Delete</button>

                      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
                      <label class="event__favorite-btn" for="event-favorite-1">
                        <span class="visually-hidden">Add to favorite</span>
                        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                        </svg>
                      </label>

                      ${mode === MODES.ADDING ? `` : `<button class="event__rollup-btn" type="button">
                                                        <span class="visually-hidden">Open event</span>
                                                      </button>`}
               
                      
                    </header>

                    ${city ? `<section class="event__details">
                                ${allOptionsOfType.length > 0 ? `<section class="event__section  event__section--offers">
                                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                                  <div class="event__available-offers">
                                    ${createOfferTemplate(allOptionsOfType)}
                                  </div>
                                </section>` : ``}

                                <section class="event__section  event__section--destination">
                                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                                  <p class="event__destination-description">${description}</p>

                                  <div class="event__photos-container">
                                    <div class="event__photos-tape">
                                      ${createPhotosTemplate(photos)}
                                    </div>
                                  </div>
                                </section>
                              </section>` : ``}
                                          </form>`
  );
};


export default class EditEvent extends AbstractSmartComponent {
  constructor(event, mode) {
    super();
    this._event = event;
    this._mode = mode;
    this._additionalEvent = PointModel.clone(this._event);

    this._flatpickr = null;
    this._applyFlatpickr();

    this._submitHandler = null;
    this._deleteButtonHandler = null;
    this._rollupButtonClickHandler = null;

    this._subscribeOnEvents();

    this.reset = this.reset.bind(this);
  }

  getTemplate() {
    return createEditEventTemplate(this._event, this._additionalEvent, this._mode);
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
  }

  setRollupButtonClickHandler(handler) {
    if (this._mode !== MODES.ADDING) {
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
      this._rollupButtonClickHandler = handler;
    }
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
    const form = this.getElement();
    const formData = new FormData(form);

    const offers = Array.from(form.querySelectorAll(`.event__offer-selector`))
      .filter((it) => it.querySelector(`.event__offer-checkbox`).checked)
      .map((el) => {
        return {
          title: el.querySelector(`.event__offer-title`).textContent,
          // type: el.querySelector(`.event__offer-checkbox`).name.substring(OPTION_NAME_PREFIX.length),
          price: +el.querySelector(`.event__offer-price`).textContent,
          // isChecked: el.querySelector(`.event__offer-checkbox`).checked
        };
      });

    return {
      formData,
      offers,
      description: form.querySelector(`.event__destination-description`).textContent,
      photos: Array.from(form.querySelectorAll(`.event__photo`)).map((photo) => {
        return {
          'src': photo.src,
          'description': photo.alt,
        };
      }),
      id: this._event.id,
    };

  }


  _checkFormForSubmit() {
    const destination = this.getElement().querySelector(`.event__input--destination`).value;
    const startTime = this.getElement().querySelector(`#event-start-time-1`).value;
    const endTime = this.getElement().querySelector(`#event-end-time-1`).value;
    const price = this.getElement().querySelector(`.event__input--price`).value;

    const saveButton = this.getElement().querySelector(`.event__save-btn`);

    if (!destination || !startTime || !endTime || !price || startTime > endTime) {
      saveButton.setAttribute(`disabled`, `true`);
    } else {
      saveButton.removeAttribute(`disabled`);
    }

  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {

      if (evt.target.tagName === `LABEL`) {

        this._additionalEvent.type = evt.target.textContent;
        this._additionalEvent.options = [];
        this.rerender();
      }
    });

    const destinationInput = element.querySelector(`.event__input--destination`);
    destinationInput.addEventListener(`focus`, () => {
      destinationInput.removeAttribute(`value`);
    });

    destinationInput.addEventListener(`change`, (evt) => {

      const selectedCity = StorageModel.getCities().find((city) => city === evt.target.value);

      if (!selectedCity) {
        this.rerender();
        return;
      }
      this._additionalEvent.city = StorageModel.getDestination(selectedCity).name;
      this._additionalEvent.description = StorageModel.getDestination(selectedCity).description;
      this._additionalEvent.photos = StorageModel.getDestination(selectedCity).pictures;

      this.rerender();
    });

    const priceInput = element.querySelector(`.event__input--price`);
    priceInput.addEventListener(`change`, () => {
      this._additionalEvent.price = priceInput.value;
      this._checkFormForSubmit();
    });


    const offers = Array.from(element.querySelectorAll(`.event__offer-selector`));
    offers.forEach((offer) => {
      offer.addEventListener(`change`, (evt) => {
        if (evt.target.checked) {
          this._additionalEvent.options.push({
            title: offer.querySelector(`.event__offer-title`).textContent,
            price: offer.querySelector(`.event__offer-price`).textContent,
          });
        } else {

          const index = this._additionalEvent.options.findIndex((option) => option.title === offer.querySelector(`.event__offer-title`).textContent);
          this._additionalEvent.options = [].concat(this._additionalEvent.options.slice(0, index), this._additionalEvent.options.slice(index + 1));

        }
      });
    });
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
