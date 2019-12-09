import {events} from "./mocks/event";
import {render, RENDER_POSITION} from "./util";


import FilterComponent from "./components/filter";
import MenuComponent from './components/menu.js';
import EditEventComponent from './components/edit-event.js';
import TripComponent from './components/create-trip.js';
import CardsComponent from './components/create-cards.js';
import CardComponent from './components/create-card.js';


const tripInfoElement = document.querySelector(`.trip-main__trip-info`);

render(tripInfoElement, new TripComponent().getElement(), RENDER_POSITION.AFTERBEGIN);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

render(tripControlsMenuElement, new MenuComponent().getElement(), RENDER_POSITION.AFTEREND);
render(tripControlsElement, new FilterComponent().getElement(), RENDER_POSITION.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);
// render(tripEventsElement, new EditEventComponent().getElement(), RENDER_POSITION.BEFOREEND);

const cardsList = new CardsComponent().getElement();

render(tripEventsElement, cardsList, RENDER_POSITION.BEFOREEND);


const renderCard = (event) => {
  const card = new CardComponent(event).getElement();
  const editCard = new EditEventComponent(event).getElement();

  const rollUpButton = card.querySelector(`.event__rollup-btn`);
  rollUpButton.addEventListener(`click`, () => {
    cardsList.replaceChild(editCard, card);
  });

  const rollDownButton = editCard.querySelector(`.event__rollup-btn`);
  rollDownButton.addEventListener(`click`, () => {
    cardsList.replaceChild(card, editCard);
  });

  editCard.addEventListener(`submit`, () => {
    cardsList.replaceChild(card, editCard);
  });

  render(cardsList, card, RENDER_POSITION.BEFOREEND);
};


events.slice().map((event) => {
  renderCard(event);
});


const calculatePrice = () => {
  let price = 0;
  events.forEach((el) => {
    price += el.price;
  });
  return price;
};


const tripCost = document.querySelector(`.trip-info__cost-value`);
tripCost.textContent = calculatePrice();
