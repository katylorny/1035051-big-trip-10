import TripComponent from "../components/create-trip";
import {render, RENDER_POSITION} from "../utils/render";
import NoPointsComponent from "../components/no-points";
import CardsComponent from "../components/create-cards";
import SortComponent, {SORT_TYPES} from "../components/sort";
import PointController from "./point-controller";
import {getSortedPoints} from "../utils/sort";

const renderEvents = (events, cardsList, onDataChange, onViewChange) => {
  return (events.slice().map((event) => {
    const pointController = new PointController(cardsList, onDataChange, onViewChange);
    // console.log(pointController);
    pointController.render(event, onDataChange);
    return pointController;
  }));
};

export default class TripController {
  constructor(container, model) {
    this._container = container;
    this._model = model;

    this._noPoints = new NoPointsComponent().getElement();
    this._cardsList = new CardsComponent().getElement();
    this._tripInfoElement = document.querySelector(`.trip-main__trip-info`);
    this._tripComponent = new TripComponent(this._model).getElement();
    this._sortComponent = new SortComponent();
    this._events = [];
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._controllers = [];

    this._updatePoints = this._updatePoints.bind(this);

    this._model.getFunctionFromTripController(this._updatePoints);
  }

  render() {
    this._events = this._model.getFilteredPoints().slice().sort((a, b) => a.startTime - b.startTime);

    this._container.innerHTML = ``;

    if (this._events.length === 0) {
      render(this._container, this._noPoints);
    } else {
      // this._events = getSortedPoints(this._events, SORT_TYPES.EVENT);

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

  _updatePoints() {
    this._controllers.forEach((controller) => controller.destroy());
    this._controllers = [];

    this.render(); // TODO:
  }

  _onSortTypeChange(sortType) {
    const sortedPoints = getSortedPoints(this._events, sortType);

    this._cardsList.innerHTML = ``;
    this._controllers = renderEvents(sortedPoints, this._cardsList, this._onDataChange, this._onViewChange);
    console.log(444, this._controllers)
  }

  _onDataChange(pointController, oldData, newData) {
    // const index = this._events.findIndex((it) => it === oldData);
    // if (index === -1) {
    //   return;
    // }
    //
    // this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));
    // pointController.render(this._events[index]);

  }

  _onViewChange() {
    this._controllers.forEach((it) => it.setDefaultView());
  }
}
