import TripComponent from "../components/create-trip";
import {render, RENDER_POSITION, replace} from "../utils/render";
import NoPointsComponent from "../components/no-points";
import CardsComponent from "../components/create-cards";
import SortComponent, {SORT_TYPES} from "../components/sort";
import PointController from "./point-controller";

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
    this._pointController = new PointController(this._cardsList);
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

      this._events.slice().map((event) => {
        this._pointController.render(event);
      });

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
    sortedEvents.map((it) => {
      this._pointController.render(it);
    });
  }
}
