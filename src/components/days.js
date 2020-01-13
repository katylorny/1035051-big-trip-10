import moment from 'moment';
import AbstractComponent from "./abstract-component";


const createDayTemplate = (day) => {

  const {date, number} = day;
  return (
    `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${number}</span>
                <time class="day__date" datetime="${moment(date).format(`YYYY-MM-DD`)}">${moment(date).format(`MMM DD`)}</time>
              </div>

              <ul class="trip-events__list" id="dayNumber${number}"></ul>
            </li>`
  );
};


const createDaysTemplate = (days) => {
  const daysMarkup = days.map((day) => createDayTemplate(day)).join(`\n`);
  return (
    `<ul class="trip-days">${daysMarkup}</ul>`
  );
};


export default class Days extends AbstractComponent {
  constructor(days) {
    super();
    this._days = days;
  }

  getTemplate() {
    return createDaysTemplate(this._days);
  }
}
