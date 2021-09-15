// Сортировка фильмов.

// Импорты.

import AbstractView from './abstraction.js';
import {typeSort} from '../utils/util.js';

// Отрисовка списка сортировки.

export function createSortTemplate() {
  return (`<ul class="sort">
      <li>
        <a href="#" data-sort-type="${typeSort.DEFAULT}" class="sort__button">Sort by default</a>
      </li>
      <li>
        <a href="#" data-sort-type="${typeSort.DATE}" class="sort__button">Sort by date</a>
      </li>
      <li>
        <a href="#" data-sort-type="${typeSort.RATING}" class="sort__button">Sort by rating</a>
      </li>
    </ul>`);
}

// Создание класса.

export default class SortComponent extends AbstractView {
  constructor() {
    super();
    this._getSortChangeHandler = this._getSortChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _getClassActive(link) {
    const sortButtons = this.getElement().querySelectorAll('.sort__button');
    sortButtons.forEach(((btn) => {
      btn.classList.remove('sort__button--active');
    }));
    link.classList.add('sort__button--active');
  }

  _getSortChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._getClassActive(evt.target);
    this._callback.sortChange(evt.target.dataset.sortType);
  }

  setSortChangeHandler(callback) {
    this._callback.sortChange = callback;
    this.getElement().addEventListener('click', this._getSortChangeHandler);
  }
}
