// Сортировка фильмов.

// Импорты.

import {createTemplate} from '../utils/util.js';

// Отрисовка списка сортировки.

export function createSortTemplate() {
  return (`<ul class="sort">
      <li>
        <a href="#" class="sort__button">Sort by default</a>
      </li>
      <li>
        <a href="#" class="sort__button">Sort by date</a>
      </li>
      <li>
        <a href="#" class="sort__button sort__button--active">Sort by rating</a>
      </li>
    </ul>`);
}

// Создание класса.

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
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
