
import AbstractComponent from "./abstract-component";

export const createCardsTemplate = () => { // <ul class="trip-days"> trip-events__list
  return (
    `<ul class="trip-events__list"></ul>`
  );
};


export default class Cards extends AbstractComponent {

  getTemplate() {
    return createCardsTemplate();
  }
}
