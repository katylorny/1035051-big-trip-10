import AbstractSmartComponent from "./abstract-smart-component";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';



const renderMoneyStatistic = (ctx, points) => {

  const types = Array.from(new Set(points.map((point) => point.type)));

  const typesPrices = types
    .map((type) => {
      return points.filter((point) => point.type === type) // массив поинтов нужного типа
        .map((point) => parseInt(point.price, 10)) // массив цен поинтов данного типа
        .reduce((sum, price) => sum + price, 0) // цифра - сумма всех цен поинтов нужного типа
    });

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',

    data: {
      labels: types,
      datasets: [{
        label: 'Money1',
        data: typesPrices,
        backgroundColor: 'white',
        borderWidth: 0,
      }]
    },

    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'MONEY',
        position: 'left'  ,
      },
      plugins: {
        datalabels: {
          // color: '#36A2EB'
          anchor: 'end',
          align: 'right',
          clamp: true,
          formatter: function (value) {
            return '$ ' + value;
          }
        }
      },
      layout: {
        padding: {
          left: 100,
          right: 0,
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
            // beginAtZero: true
          }
        }]
      }
    }
  });
};

const renderTransportStatistic = (ctx, points) => {

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
  )
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
    renderMoneyStatistic(moneyStatContainer, this._model.getAllPoints())

  }
}
