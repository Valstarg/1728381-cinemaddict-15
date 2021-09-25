// Навигация по сайту.

// Импорты.

import AbstractView from './abstraction.js';

// Отрисовка колличества фильмов(фильтры).

function createItemCountTemplate(filter, currentFilterType = 'all') {
  const {name, count, type} = filter;
  return `<a href="#watchlist" data-filter="${type}"  class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">${name}
          ${name !== 'All movies' ? `<span class="main-navigation__item-count">${count}</span>` : ''}</a>`;
}

// Отрисовка навигации.

function createNavigationTemplate(filterItems, currentFilterType) {
  filterItems.pop();
  const filterItemsTemplate = filterItems
    .map((filter) => createItemCountTemplate(filter, currentFilterType))
    .join('');
  return `<nav class="main-navigation">
            <div class="main-navigation__items">
              ${filterItemsTemplate}
            </div>
            <a href="#stats" data-filter="stats" class="main-navigation__additional ${'stats' === currentFilterType ? 'main-navigation__additional--active' : ''}">Stats</a>
          </nav>`;
}

// Создание класса.

export default class NavigationComponent extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._pageStatsChangeHandler = this._pageStatsChangeHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate(this._filters, this._currentFilterType);
  }

  _filterChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.filterChange(evt.target.dataset.filter);
  }

  _pageStatsChangeHandler(evt) {
    evt.preventDefault();
    this._callback.pageStatsChange(evt.target.dataset.filter);
  }

  setFilterChangeHandler(callback) {
    this._callback.filterChange = callback;
    this.getElement().querySelector('.main-navigation__items').addEventListener('click', this._filterChangeHandler);
  }

  setPageStatsChangeHandler(callback) {
    this._callback.pageStatsChange = callback;
    this.getElement().querySelector('.main-navigation__additional').addEventListener('click', this._pageStatsChangeHandler);
  }
}
