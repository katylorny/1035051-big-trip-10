import TripComponent from "../components/create-trip";
import {remove, render, RENDER_POSITION, replace} from "../utils/render";
import NoPointsComponent from "../components/no-points";
import SortComponent, {SORT_TYPES} from "../components/sort";
import PointController, {EmptyPoint, MODES} from "./point-controller";
import {getSortedPoints} from "../utils/sort";
import Days from "../components/days";
import moment from "moment/moment";
import NoDays from "../components/no-days";

const renderEvents = (events, cardsList, onDataChange, onViewChange) => {
  return (events.slice().map((event) => {
    const pointController = new PointController(cardsList, onDataChange, onViewChange);
    // console.log("trip controller renderEvents pointController", pointController)  //////////////////////////
    pointController.render(event, MODES.DEFAULT);
    return pointController;
  }));
};

export const calculatePrice = (events) => {
  let price = 0;

  events.forEach((el) => {
    price += el.price;

  });

  const tripCost = document.querySelector(`.trip-info__cost-value`);
  tripCost.textContent = `${price}`;
};

export const TRIP_MODE = {
  DEFAULT: `default`,
  ADDING_FIRST_POINT: `addingFirstPoint`,
};

export default class TripController {
  constructor(container, model) {
    this._container = container;
    this._model = model;

    this._activeTripMode = TRIP_MODE.DEFAULT;
    this._noPoints = new NoPointsComponent().getElement();
    // this._cardsList = new CardsComponent().getElement();
    this._tripInfoElement = document.querySelector(`.trip-main__trip-info`);
    this._tripComponent = new TripComponent(this._model).getElement();
    this._sortComponent = new SortComponent();
    // this._events = [];
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this.createNewPoint = this.createNewPoint.bind(this);

    this._controllers = [];

    this._addingPointController = null;

    this._activeSortType = SORT_TYPES.EVENT;

    this._updatePoints = this._updatePoints.bind(this);

    this._model.getFunctionFromTripController(this._updatePoints);
    this._daysComponent = null;
    this._noDaysComponent = null;

  }

  render() {

    this._events = this._model.getFilteredPoints().slice().sort((a, b) => a.startTime - b.startTime);


    // container это trip-events
    this._container.innerHTML = ``;

    if (this._events.length === 0) {
      render(this._container, this._noPoints);
      this._activeTripMode = TRIP_MODE.ADDING_FIRST_POINT;
    } else {
      // this._events = getSortedPoints(this._events, SORT_TYPES.EVENT);

      this._activeTripMode = TRIP_MODE.DEFAULT;
      render(this._container, this._sortComponent.getElement());
      render(this._tripInfoElement, this._tripComponent, RENDER_POSITION.AFTERBEGIN);
      // render(this._container, this._cardsList);

      this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
      if (this._activeSortType === SORT_TYPES.EVENT) {
        this._renderWithDays();
      } else {
        this._renderWithoutDays(this._events);
      }


      calculatePrice(this._events);

    }
  }

  createNewPoint() {
    if (this._addingPointController) {
      return;
    }
    this._onViewChange();

    if (this._activeTripMode === TRIP_MODE.ADDING_FIRST_POINT) {
      this._container.innerHTML = ``;
      this._addingPointController = new PointController(this._container, this._onDataChange, this._onViewChange, TRIP_MODE.ADDING_FIRST_POINT);
      this._addingPointController.render(EmptyPoint, MODES.ADDING);
    } else {
      this._addingPointController = new PointController(this._sortComponent.getElement(), this._onDataChange, this._onViewChange);
      this._addingPointController.render(EmptyPoint, MODES.ADDING);
    }

  }

  removePoints() {
    this._controllers.forEach((controller) => controller.destroyPoint());
    this._controllers = [];
  }

  _renderWithDays() {
    // this.removePoints();

    if (this._noDaysComponent) {
      remove(this._noDaysComponent);
      this._noDaysComponent = null;
    }

    const startDates = this._events.map((event) => { // тут лежат стартовые даты
      return moment(event.startTime).format(`YYYY MM DD`);
    });

    const firstDate = startDates[0];
    const firstNumber = 1;

    const startDatesSet = new Set(startDates); // стартовые даты без повторов

    const days = Array.from(startDatesSet).map((date) => {
      return {
        date,
        number: firstNumber + moment.duration(moment(date) - moment(firstDate)).days(),
      };
    });

    const oldDaysComponent = this._daysComponent;

    this._daysComponent = new Days(days);

    if (oldDaysComponent) {
      replace(this._daysComponent, oldDaysComponent);
    } else {
      render(this._container, this._daysComponent.getElement());
    }
    this._controllers = [];
    days.forEach((day) => {
      const pointsOfThisDay = this._events.filter((event) => { // выбираем все карточки конкретного дня
        return moment(event.startTime).format(`YYYY MM DD`) === day.date;
      });
      const place = this._daysComponent.getElement().querySelector(`#dayNumber${day.number}`); // куда рендерим карточки, ul, внутри 1 дня
      const dayControllers = renderEvents(pointsOfThisDay, place, this._onDataChange, this._onViewChange);
      this._controllers = this._controllers.concat(dayControllers);
    });

  }

  _renderWithoutDays(points) {
    // this.removePoints();

    if (this._daysComponent) {
      remove(this._daysComponent);
      this._daysComponent = null;
    }

    const oldNoDaysComponent = this._noDaysComponent;

    this._noDaysComponent = new NoDays();
    if (oldNoDaysComponent) {
      replace(this._noDaysComponent, oldNoDaysComponent);
    } else {
      render(this._container, this._noDaysComponent.getElement());
    }

    this._controllers = renderEvents(points, this._noDaysComponent.getElement().querySelector(`.trip-events__list`), this._onDataChange, this._onViewChange);
  }

  _updatePoints() {

    this._daysComponent = null;
    if (this._noDaysComponent) {
      remove(this._noDaysComponent);
      this._noDaysComponent = null;
    }

    this.render();
    calculatePrice(this._events);
  }

  _onSortTypeChange(sortType) {

    this.removePoints();
    const sortedPoints = getSortedPoints(this._events, sortType);

    if (sortType === SORT_TYPES.EVENT) {
      this._renderWithDays();
    } else {
      this._renderWithoutDays(sortedPoints);
    }

    this._activeSortType = sortType;
  }

  _onDataChange(pointController, oldData, newData) {

    if (oldData === EmptyPoint) {
      this._addingPointController = null;

      if (newData === null) {
        pointController.destroyPoint();
        this._updatePoints();
      } else {
        this._model.addPoint(newData);
        this._updatePoints();
        this._onSortTypeChange(this._activeSortType);
        // this._controllers = [].concat(pointController, this._controllers); // TODO надо или нет
      }
    } else if (newData === null) {

      this._model.removePoint(oldData.id);

      this._updatePoints();

    } else {
      const isSuccess = this._model.updatePointsData(oldData.id, newData);

      if (isSuccess) {
        // pointController.render(newData, MODES.DEFAULT);
        this._updatePoints();
      }
    }

    calculatePrice(this._model.getAllPoints());
  }

  _onViewChange() {
    this._controllers.forEach((it) => it.setDefaultView());
  }
}
