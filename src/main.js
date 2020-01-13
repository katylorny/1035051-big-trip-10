import {events} from "./mocks/event";
import {render, RENDER_POSITION} from "./utils/render";
import MenuComponent from './components/menu.js';
import TripController from './controllers/trip-controller';
import PointsModel from "./models/points";
import FilterController from "./controllers/filter-controller";

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);


render(tripControlsMenuElement, new MenuComponent().getElement(), RENDER_POSITION.AFTEREND);

const tripEvents = document.querySelector(`.trip-events`);

const pointsModel = new PointsModel();
pointsModel.setPoints(events);

const filterController = new FilterController(tripControlsElement, pointsModel);
filterController.render();

const tripController = new TripController(tripEvents, pointsModel);
tripController.render(events);


