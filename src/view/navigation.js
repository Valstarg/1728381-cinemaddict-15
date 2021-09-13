// Навигация по сайту.

// Импорты.

import {createTemplate} from '../utils/util.js';

// Отрисовка колличества фильмов(фильтры). Добавляем данные.

function createItemCountTemplate(filter) {
  const {name, count} = filter;
  return (
    `<a href="#watchlist" class="main-navigation__item">${name}
         <span class="main-navigation__item-count">${count}</span>
     </a>`
  );
}

// Отрисовка навигации.

function createNavigationTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createItemCountTemplate(filter, index === 0))
    .join('');
  return `<nav class="main-navigation">
            <div class="main-navigation__items">
              <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
              ${filterItemsTemplate}
            </div>
            <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>`;
}

// Создание класса.

export default class Navigation {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createTemplate(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
