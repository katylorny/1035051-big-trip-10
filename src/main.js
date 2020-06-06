import {render, RenderPosition} from "./utils/render";
import MenuComponent from './components/menu.js';
import TripController from './controllers/trip-controller';
import PointsModel from "./models/points-model";
import FilterController from "./controllers/filter-controller";
import StatisticsComponent from "./components/statistics";
import {MenuItem} from "./constants";
import API from "./api/api";
import LoadingComponent from "./components/loading";
import Store from './api/store.js';
import Provider from './api/provider.js';
import 'flatpickr/dist/flatpickr.css';
import EventsComponent from "./components/events";
import NewPointButtonComponent from "./components/new-point-button";


const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip`;
const AUTHORIZATION = `Basic er883jdzbdw345353456`;


const bodyElement = document.querySelector(`main .page-body__container`);
const tripInfoElement = document.querySelector(`.trip-main`);


window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {

    })
    .catch(() => {

    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  if (!apiWithProvider.getSynchronize()) {
    apiWithProvider.sync()
      .then(() => {
      })
      .catch(() => {
      });
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

const newPointButtonComponent = new NewPointButtonComponent();
render(tripInfoElement, newPointButtonComponent.getElement());

const eventsComponent = new EventsComponent();
render(bodyElement, eventsComponent.getElement());

const loadingComponent = new LoadingComponent();

render(eventsComponent.getElement(), loadingComponent.getElement());

const api = new API(END_POINT, AUTHORIZATION);

const store = new Store(STORE_NAME, window.localStorage);

const destinationsStore = new Store(`big-trip-destinations-v1`, window.localStorage);
const offersTypesStore = new Store(`big-trip-offers-types-v1`, window.localStorage);


const apiWithProvider = new Provider(api, store, destinationsStore, offersTypesStore);

const pointsModel = new PointsModel();


Promise.all([
  apiWithProvider.getPoints(),
  apiWithProvider.getDestinations(),
  apiWithProvider.getOffersTypes(),
])
  .then((results) => {
    pointsModel.setPoints(results[0]);

    // const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
    const tripControlsMenuElement = tripControlsElement.querySelector(`h2`);

    const menuComponent = new MenuComponent();
    render(tripControlsMenuElement, menuComponent.getElement(), RenderPosition.AFTEREND);

    const tripController = new TripController(eventsComponent, pointsModel, apiWithProvider);

    tripController.render();

    const filterController = new FilterController(tripControlsElement, pointsModel);
    filterController.render();

    const statisticsComponent = new StatisticsComponent(pointsModel);
    render(bodyElement, statisticsComponent.getElement());

    statisticsComponent.render();
    statisticsComponent.hide();

    newPointButtonComponent.setNewPointButtonClickHandler(() => {
      tripController.setEnableNewPointButtonHandler(newPointButtonComponent.setDisabled);
      tripController.createNewPoint();
      newPointButtonComponent.setDisabled(true);

    });

    menuComponent.setMenuItemClickHandler((currentMenuItem) => {
      switch (currentMenuItem) {
        case MenuItem.TABLE:
          statisticsComponent.hide();
          tripController.show();
          newPointButtonComponent.setDisabled(false);
          break;

        case MenuItem.STATS:
          newPointButtonComponent.setDisabled(true);
          statisticsComponent.show();
          tripController.hide();
          break;
      }
    });

  });
