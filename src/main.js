import {events} from "./mocks/event";
import {render, RENDER_POSITION} from "./utils/render";
import MenuComponent from './components/menu.js';
import TripController from './controllers/trip-controller';
import PointsModel from "./models/points";
import FilterController from "./controllers/filter-controller";
import StatisticsComponent from "./components/statistics";
import {MENU_ITEMS} from "./constants";

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

const main = document.querySelector(`.page-body__page-main`);
const bodyContainer = main.querySelector(`.page-body__container`);


const menu = new MenuComponent();
render(tripControlsMenuElement, menu.getElement(), RENDER_POSITION.AFTEREND);

const tripEvents = document.querySelector(`.trip-events`);

const pointsModel = new PointsModel();
pointsModel.setPoints(events);

const filterController = new FilterController(tripControlsElement, pointsModel);
filterController.render();

const tripController = new TripController(tripEvents, pointsModel);
tripController.render(events);

// document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, tripController.createNewPoint);

const statisticsComponent = new StatisticsComponent(pointsModel);


render(bodyContainer, statisticsComponent.getElement());
statisticsComponent.hide();

menu.setMenuItemClickHandler((currentMenuItem) => {
  switch (currentMenuItem) {
    case MENU_ITEMS.TABLE:
      statisticsComponent.hide();
      tripController.show();

      document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, tripController.createNewPoint);
      break;

    case MENU_ITEMS.STATS:

      statisticsComponent.show();
      tripController.hide();
      break;
  }
});

statisticsComponent.render();
