import AbstractSmartComponent from "./abstract-smart-component";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TYPES_MOVE} from "../constants";
import {timeDuration} from "../utils/common";

const BAR_HEIGHT = 40;
const COEFF = 1.5;


const renderMoneyStatistic = (ctx, points) => {

  const types = Array.from(new Set(points.map((point) => point.type)));

  const typesPrices = types
    .map((type) => {
      return points.filter((point) => point.type === type) // массив поинтов нужного типа
        .map((point) => parseInt(point.price, 10)) // массив цен поинтов данного типа
        .reduce((sum, price) => sum + price, 0); // цифра - сумма всех цен поинтов нужного типа
    });

  const data = {
    labels: types,
    datasets: [{
      label: `Money`,
      data: typesPrices,
      backgroundColor: `white`,
      borderWidth: 0,
    }]
  };

  ctx.height = BAR_HEIGHT * COEFF * types.length;

  const options = {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: `MONEY`,
      position: `left`,
    },
    plugins: {
      datalabels: {
        anchor: `end`,
        align: `right`,
        clamp: true,
        formatter: ((value) => `$ ` + value),
      }
    },
    layout: {
      padding: {
        left: 100,
        right: 50,
        top: 0,
        bottom: 0
      },
    },

    maintainAspectRatio: false,

    scales: {

      yAxes: [{
        barThickness: 40,
        // barPercentage: 0.95,
        gridLines: {
          display: false
        },
      }],

      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }]
    }
  };

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data,
    options,
  });
};

const renderTransportStatistic = (ctx, points) => {

  const types = points.map((point) => point.type); // все типы которые есть в поинтах
  const allTypesOfTransport = types.filter((type) => TYPES_MOVE.indexOf(type) !== -1);
  const typesOfTransportSet = Array.from(new Set(allTypesOfTransport));

  const countsOfTypes = typesOfTransportSet.map((type) => {
    let count = 0;
    allTypesOfTransport.forEach((typeOfTransport) => {
      if (typeOfTransport === type) {
        count += 1;
      }
    });
    return count;
  });


  const data = {
    labels: typesOfTransportSet,
    datasets: [{
      label: `Transport`,
      data: countsOfTypes,
      backgroundColor: `white`,
      borderWidth: 0,
    }]
  };

  ctx.height = BAR_HEIGHT * COEFF * typesOfTransportSet.length;

  const options = {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: `TRANSPORT`,
      position: `left`,
    },
    plugins: {
      datalabels: {
        anchor: `end`,
        align: `right`,
        clamp: true,
        formatter: ((value) => value + `x`),
      }
    },
    layout: {
      padding: {
        left: 100,
        right: 50,
        top: 0,
        bottom: 0
      },
    },

    maintainAspectRatio: false,

    scales: {

      yAxes: [{
        barThickness: 40,
        // barPercentage: 0.95,
        gridLines: {
          display: false
        },
      }],

      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }]
    }
  };

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data,
    options,
  });
};

const renderTimeSpendStatistic = (ctx, points) => {
  const types = points.map((point) => `${point.type}: ${point.city}`);

  const typesDuration = points.map((point) => {
    return timeDuration(point.startTime, point.endTime).asHours();
  });

  const data = {
    labels: types,
    datasets: [{
      label: `Transport`,
      data: typesDuration,
      backgroundColor: `white`,
      borderWidth: 0,
    }]
  };

  ctx.height = BAR_HEIGHT * COEFF * types.length;

  const options = {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: `TIME SPENT`,
      position: `left`,
    },
    plugins: {
      datalabels: {
        anchor: `end`,
        align: `right`,
        clamp: true,
        formatter: ((value) => (value + `H`)),
      }
    },
    layout: {
      padding: {
        left: 100,
        right: 50,
        top: 0,
        bottom: 0
      },
    },

    maintainAspectRatio: false,

    scales: {

      yAxes: [{
        barThickness: 40,
        gridLines: {
          display: false
        },
      }],

      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
          // beginAtZero: true
        }
      }]
    }
  };

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data,
    options,
  });
};


const createStatisticsMarkup = () => {
  return (
    `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900" ></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(model) {
    super();

    this._model = model;
  }

  getTemplate() {
    return createStatisticsMarkup();
  }

  render() {

    const moneyStatContainer = this.getElement().querySelector(`.statistics__chart--money`);
    const transportStatContainer = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendContainer = this.getElement().querySelector(`.statistics__chart--time`);
    renderMoneyStatistic(moneyStatContainer, this._model.getAllPoints());
    renderTransportStatistic(transportStatContainer, this._model.getAllPoints());
    renderTimeSpendStatistic(timeSpendContainer, this._model.getAllPoints());
  }

  show() {
    super.show();
    this.rerender();
  }

  rerender() {
    super.rerender();
    this.render();
  }

  recoveryListeners() {
  }
}
