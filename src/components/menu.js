import AbstractComponent from "./abstract-component";
import {MenuItem} from "../constants";

const ACTIVE_MENU_ITEM_CLASS = `trip-tabs__btn--active`;

const generateMenuMarkup = (menuItemsArray, currentMenuItem) => {
  return menuItemsArray.map((menuItem) => {
    return (
      `<a class="trip-tabs__btn ${menuItem === currentMenuItem ? `trip-tabs__btn--active` : ``}" href="#">${menuItem}</a>`
    );
  }).join(`\n`);
};

const createMenuTemplate = (menuItemsArray, currentMenuItem) => { // Меню
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${generateMenuMarkup(menuItemsArray, currentMenuItem)}
     </nav>`
  );
};

export default class Menu extends AbstractComponent {

  constructor() {
    super();

    this._currentMenuItem = MenuItem.TABLE;
  }

  getTemplate() {
    return createMenuTemplate(Array.from(Object.values(MenuItem)), this._currentMenuItem);
  }

  setMenuItemClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A` || evt.target.textContent === this._currentMenuItem) {
        return;
      }

      this._currentMenuItem = MenuItem[evt.target.textContent.toUpperCase()];

      handler(this._currentMenuItem);

      this._setActiveItem(evt.target);
    });
  }

  _setActiveItem(item) {
    const allMenuItems = Array.from(this.getElement().querySelectorAll(`.trip-tabs__btn`));
    allMenuItems.forEach((menuItem) => menuItem.classList.remove(ACTIVE_MENU_ITEM_CLASS));

    item.classList.add(ACTIVE_MENU_ITEM_CLASS);
  }
}
