import {events} from "./mocks/event";
import {render, RENDER_POSITION} from "./util";


import FilterComponent from "./components/filter";
import MenuComponent from './components/menu.js';
import EditEventComponent from './components/edit-event.js';
import TripComponent from './components/create-trip.js';
import CardsComponent from './components/create-cards.js';
import CardComponent from './components/create-card.js';
import NoPointsComponent from './components/no-points.js';


const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

render(tripControlsMenuElement, new MenuComponent().getElement(), RENDER_POSITION.AFTEREND);
render(tripControlsElement, new FilterComponent().getElement(), RENDER_POSITION.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);

const cardsList = new CardsComponent().getElement();


const renderCard = (event) => {
  const card = new CardComponent(event);
  const editCard = new EditEventComponent(event);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToCard();
    }
  };

  const replaceEditToCard = () => {
    cardsList.replaceChild(card.getElement(), editCard.getElement());
  };
  const replaceCardToEdit = () => {
    cardsList.replaceChild(editCard.getElement(), card.getElement());
    document.addEventListener(`keydown`, onEscKeyDown, {once: true});
  };

  const rollUpButton = card.getElement().querySelector(`.event__rollup-btn`);
  rollUpButton.addEventListener(`click`, replaceCardToEdit);

  const rollDownButton = editCard.getElement().querySelector(`.event__rollup-btn`);

  rollDownButton.addEventListener(`click`, replaceEditToCard);

  editCard.getElement().addEventListener(`submit`, replaceEditToCard);

  render(cardsList, card.getElement(), RENDER_POSITION.BEFOREEND);
};


const noPoints = new NoPointsComponent();

if (events.length === 0) {
  render(tripEventsElement, noPoints.getElement(), RENDER_POSITION.BEFOREEND);
} else {
  render(tripInfoElement, new TripComponent().getElement(), RENDER_POSITION.AFTERBEGIN);
  render(tripEventsElement, cardsList, RENDER_POSITION.BEFOREEND);

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
}


