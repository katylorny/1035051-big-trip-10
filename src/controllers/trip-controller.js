// import {events} from "../mocks/event";
import TripComponent from "../components/create-trip";
import {render, RENDER_POSITION, replace} from "../utils/render";
import NoPointsComponent from "../components/no-points";
import CardsComponent from "../components/create-cards";
import CardComponent from '../components/create-card.js';
import EditEventComponent from '../components/edit-event.js';


const renderCard = (event, eventsList) => {
  const card = new CardComponent(event);
  const editCard = new EditEventComponent(event);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToCard();
    }
  };

  const replaceEditToCard = () => {
    replace(card, editCard);
  };
  const replaceCardToEdit = () => {
    replace(editCard, card);
    document.addEventListener(`keydown`, onEscKeyDown, {once: true});
  };

  card.setRollupButtonClickHandler(replaceCardToEdit);
  editCard.setRollupButtonClickHandler(replaceEditToCard);
  editCard.setSubmitFormHandler(replaceEditToCard);

  render(eventsList, card.getElement(), RENDER_POSITION.BEFOREEND);
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPoints = new NoPointsComponent().getElement();
    this._cardsList = new CardsComponent().getElement();
    this._tripInfoElement = document.querySelector(`.trip-main__trip-info`);
    this._tripComponent = new TripComponent().getElement();
    // this._tripEventsElement = document.querySelector(`.trip-events`);
  }

  render(events) {
    if (events.length === 0) {
      render(this._container, this._noPoints, RENDER_POSITION.BEFOREEND);
    } else {
      render(this._tripInfoElement, this._tripComponent, RENDER_POSITION.AFTERBEGIN);
      render(this._container, this._cardsList, RENDER_POSITION.BEFOREEND);

      events.slice().map((event) => {
        renderCard(event, this._cardsList);
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
  }
}
