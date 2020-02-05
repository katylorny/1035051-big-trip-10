import TripComponent from "../components/create-trip";
import {remove, render, RenderPosition, replace} from "../utils/render";
import NoPointsComponent from "../components/no-points";
import SortComponent, {SortType} from "../components/sort";
import PointController, {EmptyPointModel, Mode} from "./point-controller";
import {getSortedPoints} from "../utils/sort";
import Days from "../components/days";
import moment from "moment/moment";
import NoDays from "../components/no-days";


const renderEvents = (events, cardsList, onDataChange, onViewChange, api) => {
  return (events.slice().map((event) => {
    const pointController = new PointController(cardsList, onDataChange, onViewChange, api);

    pointController.render(event, Mode.DEFAULT);
    return pointController;
  }));
};

export const calculatePrice = (events) => {
  let price = 0;

  events.forEach((event) => {
    price += event.price;
    event.options.forEach((option) => {
      price += option.price;
    });
  });

  const tripCost = document.querySelector(`.trip-info__cost-value`);
  tripCost.textContent = `${price}`;
};

export const TripMode = {
  DEFAULT: `default`,
  ADDING_FIRST_POINT: `addingFirstPoint`,
};

export default class TripController {
  constructor(container, model, api) {
    this._container = container;
    this._containerElement = this._container.getElement();
    this._model = model;
    this._api = api;

    this._activeTripMode = TripMode.DEFAULT;
    this._noPoints = new NoPointsComponent().getElement();
    this._tripInfoElement = document.querySelector(`.trip-main__trip-info`);
    this._tripComponent = null;
    this._sortComponent = new SortComponent();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this.createNewPoint = this.createNewPoint.bind(this);

    this._controllers = [];
    this._enableButtonHandlers = [];

    this._addingPointController = null;

    this._activeSortType = SortType.EVENT;

    this._updatePoints = this._updatePoints.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._model.getFunctionFromTripController(this._updatePoints);
    this._daysComponent = null;
    this._noDaysComponent = null;

  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {

    this._events = this._model.getFilteredPoints().slice().sort((a, b) => a.startTime - b.startTime);
    this._containerElement.innerHTML = ``;

    if (this._model.getAllPoints().length === 0) {
      render(this._containerElement, this._noPoints);
      this._activeTripMode = TripMode.ADDING_FIRST_POINT;
      if (this._tripComponent) {
        remove(this._tripComponent);
        this._tripComponent = null;
      }
    } else {
      this._activeTripMode = TripMode.DEFAULT;
      render(this._containerElement, this._sortComponent.getElement());


      if (!this._tripComponent) {
        this._tripComponent = new TripComponent(this._model);
        render(this._tripInfoElement, this._tripComponent.getElement(), RenderPosition.AFTERBEGIN);
      } else {
        const oldTripComponent = this._tripComponent;
        this._tripComponent = new TripComponent(this._model);

        replace(this._tripComponent, oldTripComponent);
      }
      this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

      if (this._activeSortType === SortType.EVENT) {
        this._renderWithDays();
      } else {
        this._renderWithoutDays(this._events);
      }
      calculatePrice(this._model.getAllPoints());
    }
  }

  createNewPoint() {
    if (this._addingPointController) {
      return;
    }
    this._onViewChange();

    if (this._activeTripMode === TripMode.ADDING_FIRST_POINT) {
      this._containerElement.innerHTML = ``;
      this._addingPointController = new PointController(this._containerElement, this._onDataChange, this._onViewChange, this._api, TripMode.ADDING_FIRST_POINT);
      this._addingPointController.render(EmptyPointModel, Mode.ADDING);
    } else {
      this._addingPointController = new PointController(this._sortComponent.getElement(), this._onDataChange, this._onViewChange, this._api);
      this._addingPointController.render(EmptyPointModel, Mode.ADDING);
    }

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }


  removePoints() {
    this._controllers.forEach((controller) => controller.destroyPoint());
    this._controllers = [];
  }

  setEnableNewPointButtonHandler(handler) {
    this._enableButtonHandlers.push(handler);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._enableButtonHandlers.forEach((handler) => handler(false));
      this._addingPointController = null;
      this._updatePoints();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _renderWithDays() {
    this.removePoints();

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
        number: firstNumber + moment.duration(moment(date).diff(moment(firstDate))).as(`days`),
      };
    });

    const oldDaysComponent = this._daysComponent;

    this._daysComponent = new Days(days);

    if (oldDaysComponent) {
      replace(this._daysComponent, oldDaysComponent);
    } else {
      render(this._containerElement, this._daysComponent.getElement());
    }
    this._controllers = [];
    days.forEach((day) => {
      const pointsOfThisDay = this._events.filter((event) => { // выбираем все карточки конкретного дня
        return moment(event.startTime).format(`YYYY MM DD`) === day.date;
      });
      const place = this._daysComponent.getElement().querySelector(`#dayNumber${day.number}`); // куда рендерим карточки, ul, внутри 1 дня
      const dayControllers = renderEvents(pointsOfThisDay, place, this._onDataChange, this._onViewChange, this._api);
      this._controllers = this._controllers.concat(dayControllers);
    });

  }

  _renderWithoutDays(points) {
    this.removePoints();

    if (this._daysComponent) {
      remove(this._daysComponent);
      this._daysComponent = null;
    }

    const oldNoDaysComponent = this._noDaysComponent;

    this._noDaysComponent = new NoDays();
    if (oldNoDaysComponent) {
      replace(this._noDaysComponent, oldNoDaysComponent);
    } else {
      render(this._containerElement, this._noDaysComponent.getElement());
    }

    const sortedPoints = getSortedPoints(points, this._activeSortType);
    this._controllers = renderEvents(sortedPoints, this._noDaysComponent.getElement().querySelector(`.trip-events__list`), this._onDataChange, this._onViewChange, this._api);

  }

  _updatePoints() {
    this._daysComponent = null;
    if (this._noDaysComponent) {
      remove(this._noDaysComponent);
      this._noDaysComponent = null;
    }

    this.render();
  }

  _onSortTypeChange(sortType) {
    this._activeSortType = sortType;
    this.removePoints();
    const sortedPoints = getSortedPoints(this._events, sortType);

    if (sortType === SortType.EVENT) {
      this._renderWithDays();
    } else {
      this._renderWithoutDays(sortedPoints);
    }
  }


  _onDataChange(pointController, oldData, newData) {

    if (oldData === EmptyPointModel) {
      this._addingPointController = null;

      if (newData === null) {
        pointController.destroyPoint();
        this._updatePoints();
      } else {
        this._api.createPoint(newData)
          .then((pointModel) => {
            this._model.addPoint(pointModel);
            this._updatePoints();
            this._onSortTypeChange(this._activeSortType);
          })
          .catch(() => {
            pointController.shake();
          });
      }
    } else if (newData === null) {

      this._api.deletePoint(oldData.id)
        .then(() => {
          this._model.removePoint(oldData.id);
          this._updatePoints();
        })
        .catch(() => {
          pointController.shake();
        });

    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((pointModel) => {
          const isSuccess = this._model.updatePointsData(oldData.id, pointModel);

          if (isSuccess) {
            this._updatePoints();
          }
        })
        .catch(() => {
          pointController.shake();
        });
    }
    this._enableButtonHandlers.forEach((handler) => handler(false));
    calculatePrice(this._model.getAllPoints());
  }

  _onViewChange() {
    this._controllers.forEach((it) => it.setDefaultView());

    if (this._addingPointController) {
      this._addingPointController.destroyPoint();
      this._addingPointController = null;

      this._enableButtonHandlers.forEach((handler) => handler(false));
    }
  }
}
