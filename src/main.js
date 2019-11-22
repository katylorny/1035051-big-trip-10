'use strict';

const CARDS_COUNT = 3;
const createMenuTemplate = () => { // Меню
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
              <a class="trip-tabs__btn" href="#">Stats</a>
            </nav>`
  );
};

const createFilterTemplate = () => { // Фильтры
  return (
    `<form class="trip-filters" action="#" method="get">
              <div class="trip-filters__filter">
                <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
                <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
              </div>

              <div class="trip-filters__filter">
                <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
                <label class="trip-filters__filter-label" for="filter-future">Future</label>
              </div>

              <div class="trip-filters__filter">
                <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
                <label class="trip-filters__filter-label" for="filter-past">Past</label>
              </div>

              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`
  );
};

const createCardsTemplate = () => { // <ul class="trip-days"> trip-events__list
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

const createCardTemplate = () => {
  return (
    `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
                    </div>
                    <h3 class="event__title">Drive to Geneva</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="2019-03-19T10:00">10:00</time>
                        &mdash;
                        <time class="event__end-time" datetime="2019-03-19T11:00">11:00</time>
                      </p>
                      <p class="event__duration">1H</p>
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">20</span>
                    </p>

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`
  );
}; // trip-events__item

const createEventTemplate = () => { // Форма создания/редактирования (используется одна форма);
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
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

                    <div class="event__type-item">
                      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                      <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                      <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                      <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                      <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                      <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                      <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                    </div>
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>

                    <div class="event__type-item">
                      <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                      <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                      <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  Sightseeing at
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
                <datalist id="destination-list-1">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                  <option value="Saint Petersburg"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
          </form>`
  );
}; // взяла add-first-event
const createEditEventTemplate = () => {
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

                            <div class="event__type-item">
                              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                            </div>

                            <div class="event__type-item">
                              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                            </div>

                            <div class="event__type-item">
                              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                            </div>

                            <div class="event__type-item">
                              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                            </div>

                            <div class="event__type-item">
                              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                            </div>

                            <div class="event__type-item">
                              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                            </div>

                            <div class="event__type-item">
                              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                            </div>
                          </fieldset>

                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Activity</legend>

                            <div class="event__type-item">
                              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                            </div>

                            <div class="event__type-item">
                              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                            </div>

                            <div class="event__type-item">
                              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                            </div>
                          </fieldset>
                        </div>
                      </div>

                      <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                          Sightseeing at
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Saint Petersburg" list="destination-list-1">
                        <datalist id="destination-list-1">
                          <option value="Amsterdam"></option>
                          <option value="Geneva"></option>
                          <option value="Chamonix"></option>
                        </datalist>
                      </div>

                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">
                          From
                        </label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
                        &mdash;
                        <label class="visually-hidden" for="event-end-time-1">
                          To
                        </label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
                      </div>

                      <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                          <span class="visually-hidden">Price</span>
                          &euro;
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
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
                          <div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                            <label class="event__offer-label" for="event-offer-luggage-1">
                              <span class="event__offer-title">Add luggage</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">30</span>
                            </label>
                          </div>

                          <div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                            <label class="event__offer-label" for="event-offer-comfort-1">
                              <span class="event__offer-title">Switch to comfort class</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">100</span>
                            </label>
                          </div>

                          <div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                            <label class="event__offer-label" for="event-offer-meal-1">
                              <span class="event__offer-title">Add meal</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">15</span>
                            </label>
                          </div>

                          <div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                            <label class="event__offer-label" for="event-offer-seats-1">
                              <span class="event__offer-title">Choose seats</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">5</span>
                            </label>
                          </div>

                          <div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                            <label class="event__offer-label" for="event-offer-train-1">
                              <span class="event__offer-title">Travel by train</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">40</span>
                            </label>
                          </div>
                        </div>
                      </section>

                      <section class="event__section  event__section--destination">
                        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                        <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

                        <div class="event__photos-container">
                          <div class="event__photos-tape">
                            <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
                            <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
                            <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
                            <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
                            <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
                          </div>
                        </div>
                      </section>
                    </section>
                  </form>`
  );
}; // взяла edit-event

const createTripTemplate = () => {
  return (
    `<div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>

              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
            </div>`
  );
};


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);

render(tripInfoElement, createTripTemplate(), `afterbegin`);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

render(tripControlsMenuElement, createMenuTemplate(), `afterend`);
render(tripControlsElement, createFilterTemplate());

const tripEventsElement = document.querySelector(`.trip-events`);

render(tripEventsElement, createEditEventTemplate());
render(tripEventsElement, createEventTemplate());
render(tripEventsElement, createCardsTemplate());

const tripCardsElement = document.querySelector(`.trip-events__list`);

new Array(CARDS_COUNT)
  .fill(``)
  .forEach(
      () => render(tripCardsElement, createCardTemplate())
  );


