// Пустой список фильмов.

// Импорты.

import AbstractView from './abstraction.js';
import {filterType} from '../utils/util.js';

// Переменные.

const NoFilmsText = {
  [filterType.ALL]: 'There are no movies in our database',
  [filterType.FAVORITES]: 'There are no favorite movies now',
  [filterType.WATCHLIST]: 'There are no movies to watch now',
  [filterType.HISTORY]: 'There are no watched movies now',
};

// Отрисовка списка.

function createEmptyListTemplate(typeFilter) {
  const noFilmsTextValue = NoFilmsText[typeFilter];
  return `<h2 class="films-list__title">${noFilmsTextValue}</h2 > `;
}

// Создание класса.

export default class NoFilmsComponent extends AbstractView {
  constructor(data) {
    super();
    this._data = String(data);
  }

  getTemplate() {
    return createEmptyListTemplate(this._data);
  }
}
