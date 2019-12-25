import {events} from "./mocks/event";
import {render, RENDER_POSITION} from "./utils/render";
import FilterComponent from "./components/filter";
import MenuComponent from './components/menu.js';
import TripController from './controllers/trip-controller';


const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);


render(tripControlsMenuElement, new MenuComponent().getElement(), RENDER_POSITION.AFTEREND);
render(tripControlsElement, new FilterComponent().getElement());

const tripEvents = document.querySelector(`.trip-events`);


const tripController = new TripController(tripEvents);
tripController.render(events);
