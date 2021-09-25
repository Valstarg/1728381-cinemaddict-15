// Статистика.

// Импорты.

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import {statFilterTypes, getRuntime, getDataGenres, getRank, isDate} from '../utils/util.js';

// Магические числа.

const CHART_HEIGHT = 50;

// Отрисовка диаграмм статистики.

const renderChart = (statCtx, data, currentFilterType = 'all-time') => {
  const filterData = isDate(data, currentFilterType);
  const counts = getDataGenres(filterData, true);
  const genres = getDataGenres(filterData);
  new Chart(statCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genres,
      datasets: [{
        data: counts,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

// Шаблон.

export function createStatTemplate(currentFilterType = 'all-time', data) {
  const filterData = isDate(data, currentFilterType);
  const sumRuntime = getRuntime(filterData);
  const userRank = getRank(data.length);
  const genres = getDataGenres(filterData);
  const hoursRuntime = Math.floor(sumRuntime / 60);
  const minutesRuntime = sumRuntime % 60;
  return `<section class="statistic">
            <p class="statistic__rank">Your rank
              <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
              <span class="statistic__rank-label">${userRank}</span>
            </p>
            <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
              <p class="statistic__filters-description">Show stats:</p>
              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time"
              value="${statFilterTypes.ALL}"
              ${currentFilterType === statFilterTypes.ALL ? 'checked' : ''} >
              <label for="statistic-all-time" class="statistic__filters-label">All time</label>
              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today"
              value="${statFilterTypes.TODAY}"
              ${currentFilterType === statFilterTypes.TODAY ? 'checked' : ''}>
              <label for="statistic-today" class="statistic__filters-label">Today</label>
              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week"
              value="${statFilterTypes.WEEK}"
              ${currentFilterType === statFilterTypes.WEEK ? 'checked' : ''}>
              <label for="statistic-week" class="statistic__filters-label">Week</label>
              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month"
              value="${statFilterTypes.MONTH}"
              ${currentFilterType === statFilterTypes.MONTH ? 'checked' : ''}>
              <label for="statistic-month" class="statistic__filters-label">Month</label>
              <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year"
              value="${statFilterTypes.YEAR}"
              ${currentFilterType === statFilterTypes.YEAR ? 'checked' : ''}>
              <label for="statistic-year" class="statistic__filters-label">Year</label>
            </form>
            <ul class="statistic__text-list">
              <li class="statistic__text-item">
                <h4 class="statistic__item-title">You watched</h4>
                <p class="statistic__item-text">${filterData.length} <span class="statistic__item-description">movies</span></p>
              </li>
              <li class="statistic__text-item">
                <h4 class="statistic__item-title">Total duration</h4>
                <p class="statistic__item-text">${hoursRuntime} <span class="statistic__item-description">h</span>${minutesRuntime} <span class="statistic__item-description">m</span></p>
              </li>
              <li class="statistic__text-item">
                <h4 class="statistic__item-title">Top genre</h4>
                <p class="statistic__item-text">${genres.length ? genres[0] : ''}</p>
              </li>
            </ul>
            <div class="statistic__chart-wrap">
            <canvas class="statistic__chart" width="1000" height="${CHART_HEIGHT * genres.length}"
            ></canvas>
            </div>
          </section>`;
}

// Создание класса.

export default class StatComponent extends SmartView {
  constructor(currentFilterType, data) {
    super();
    this._data = data;
    this._currentFilterType = currentFilterType;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._getChart();
  }

  getTemplate() {
    return createStatTemplate(this._currentFilterType, this._data);
  }

  _filterChangeHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.filterChange(evt.target.value);
  }

  setFilterChangeHandler(callback) {
    this._callback.filterChange = callback;
    this.getElement().querySelector('.statistic__filters').addEventListener('click', this._filterChangeHandler);
  }

  _getChart() {
    this._statisticChart = this.getElement().querySelector('.statistic__chart');
    renderChart(this._statisticChart, this._data, this._currentFilterType);
  }
}
