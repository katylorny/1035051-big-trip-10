// import {generatedEvents} from "../mocks/event";
import {TYPES_STAY} from "../mocks/event";
// import {TYPES_MOVE} from "../mocks/event";
import {calculateTimeDifference} from "../util";
import {castTimeDateFormat} from "../util";
import {events} from "../mocks/event";


export const createCardTemplate = (cardObject) => {
  const {type, city, price, startTime, endTime} = cardObject;
  const difference = calculateTimeDifference(startTime, endTime);
  const [days, hours, minutes] = difference;

  return (
    `<li class="trip-events__item">
                  <div class="event">
                    <div class="event__type">
                      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon"> 
                    </div>
                    <h3 class="event__title">${type} ${TYPES_STAY.includes(type) ? `in` : `to`} ${city}</h3>

                    <div class="event__schedule">
                      <p class="event__time">
                        <time class="event__start-time" datetime="${startTime}">${castTimeDateFormat(startTime.getHours())}:${castTimeDateFormat(startTime.getMinutes())}</time> 
                        &mdash;
                        <time class="event__end-time" datetime="${endTime}">${castTimeDateFormat(endTime.getHours())}:${castTimeDateFormat(endTime.getMinutes())}</time>
                      </p>
                      <p class="event__duration">${days === 0 ? `` : `${castTimeDateFormat(days)}D`} ${days + hours === 0 ? `` : `${castTimeDateFormat(hours)}H`} ${castTimeDateFormat(minutes)}M </p> 
                    </div>

                    <p class="event__price">
                      &euro;&nbsp;<span class="event__price-value">${price}</span>
                    </p>

                    <button class="event__rollup-btn" type="button">
                      <span class="visually-hidden">Open event</span>
                    </button>
                  </div>
                </li>`
  );
};// trip-events__item

export const eventsMarkup = events.slice(1).map((el) => {
  return (createCardTemplate(el));
});


