// Навигация по сайту.

// Импорты.

import AbstractView from './abstraction.js';

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

export default class NavigationComponent extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters);
  }
}
