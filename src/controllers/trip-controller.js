import TripComponent from "../components/create-trip";
import {render, RENDER_POSITION} from "../utils/render";
import NoPointsComponent from "../components/no-points";
import CardsComponent from "../components/create-cards";
import SortComponent, {SORT_TYPES} from "../components/sort";
import PointController from "./point-controller";
// import {events} from "../mocks/event";

const renderEvents = (events, cardsList, onDataChange, onViewChange) => {
  return (events.slice().map((event) => {
    const pointController = new PointController(cardsList, onDataChange, onViewChange);
    // console.log(pointController);
    pointController.render(event, onDataChange);
    return pointController;
  }));
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPoints = new NoPointsComponent().getElement();
    this._cardsList = new CardsComponent().getElement();
    this._tripInfoElement = document.querySelector(`.trip-main__trip-info`);
    this._tripComponent = new TripComponent().getElement();
    this._sortComponent = new SortComponent();
    this._events = [];
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._controllers = [];
  }

  render(events) {
    this._events = events;
    if (events.length === 0) {
      render(this._container, this._noPoints);
    } else {
      render(this._container, this._sortComponent.getElement());
      render(this._tripInfoElement, this._tripComponent, RENDER_POSITION.AFTERBEGIN);
      render(this._container, this._cardsList);

      this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

      this._controllers = renderEvents(this._events, this._cardsList, this._onDataChange, this._onViewChange);

      const calculatePrice = () => {
        let price = 0;
        this._events.forEach((el) => {
          price += el.price;
        });
        return price;
      };
      const tripCost = document.querySelector(`.trip-info__cost-value`);
      tripCost.textContent = calculatePrice();
    }
  }

  _onSortTypeChange(sortType) {
    let sortedEvents = [];

    switch (sortType) {
      case SORT_TYPES.EVENT:
        sortedEvents = this._events.slice();
        break;
      case SORT_TYPES.PRICE:
        sortedEvents = this._events.slice().sort((a, b) => b.price - a.price);
        break;
      case SORT_TYPES.TIME:
        sortedEvents = this._events.slice().sort((a, b) => {
          return (b.endTime - b.startTime) - (a.endTime - a.startTime);
        });
        break;
    }

    this._cardsList.innerHTML = ``;
    renderEvents(sortedEvents, this._cardsList, this._onDataChange, this._onViewChange);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));
    pointController.render(this._events[index]);

  }

  _onViewChange() {
    this._controllers.forEach((it) => it.setDefaultView());
  }
}
