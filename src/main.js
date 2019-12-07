import {createCardsTemplate} from './components/create-cards.js';
import {createTripTemplate} from './components/create-trip.js';
import {createEditEventTemplate} from './components/edit-event.js';
// import {createCardTemplate} from './components/create-card.js';
import {createFilterTemplate} from './components/filter.js';
import {createMenuTemplate} from './components/menu.js';
// import {generateEvent} from "./mocks/event";
// import {events} from "./mocks/event";
import {eventsMarkup} from "./components/create-card";
import {events} from "./mocks/event";

// const CARDS_COUNT = 3;

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
render(tripEventsElement, createCardsTemplate());

const tripCardsElement = document.querySelector(`.trip-events__list`);

render(tripCardsElement, eventsMarkup);

const calculatePrice = () => {
  let price = 0;
  events.forEach((el) => {
    price += el.price;
  });
  return price;
};


const tripCost = document.querySelector(`.trip-info__cost-value`);
tripCost.textContent = calculatePrice();
