import {render, RENDER_POSITION} from "./utils/render";
import MenuComponent from './components/menu.js';
import TripController from './controllers/trip-controller';
import PointsModel from "./models/points-model";
import FilterController from "./controllers/filter-controller";
import StatisticsComponent from "./components/statistics";
import {MENU_ITEMS} from "./constants";
import API from "./api/api";

const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip`;
const AUTHORIZATION = `Basic er883jdzbdw345353456`;

const api = new API(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();


Promise.all([
  api.getPoints(),
  api.getDestinations(),
  api.getOffersTypes(),
])
  .then((results) => {
    pointsModel.setPoints(results[0]);

    const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
    const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

    const main = document.querySelector(`.page-body__page-main`);
    const bodyContainer = main.querySelector(`.page-body__container`);


    const menu = new MenuComponent();
    render(tripControlsMenuElement, menu.getElement(), RENDER_POSITION.AFTEREND);

    const tripEvents = document.querySelector(`.trip-events`);

    const tripController = new TripController(tripEvents, pointsModel, api);

    tripController.render();

    const filterController = new FilterController(tripControlsElement, pointsModel);
    filterController.render();

    const statisticsComponent = new StatisticsComponent(pointsModel);
    render(bodyContainer, statisticsComponent.getElement());

    statisticsComponent.render();
    statisticsComponent.hide();
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, tripController.createNewPoint);
    menu.setMenuItemClickHandler((currentMenuItem) => {
      switch (currentMenuItem) {
        case MENU_ITEMS.TABLE:
          statisticsComponent.hide();
          tripController.show();
          document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
          break;

        case MENU_ITEMS.STATS:
          document.querySelector(`.trip-main__event-add-btn`).setAttribute(`disabled`, `true`);
          statisticsComponent.show();
          tripController.hide();
          break;
      }
    });

  });
