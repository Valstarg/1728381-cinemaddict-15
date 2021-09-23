// Сортировка фильмов.

// Импорты.

import AbstractView from './abstraction.js';
import {typeSort} from '../utils/util.js';

// Отрисовка списка сортировки.

export function createSortTemplate(currentSortType) {
  return (`<ul class="sort">
      <li>
        <a href="#" data-sort-type="${typeSort.DEFAULT}" class="sort__button ${currentSortType === typeSort.DEFAULT ? 'sort__button--active' : ''}">Sort by default</a>
      </li>
      <li>
        <a href="#" data-sort-type="${typeSort.DATE}" class="sort__button ${currentSortType === typeSort.DATE ? 'sort__button--active' : ''}">Sort by date</a>
      </li>
      <li>
        <a href="#" data-sort-type="${typeSort.RATING}" class="sort__button ${currentSortType === typeSort.RATING ? 'sort__button--active' : ''}">Sort by rating</a>
      </li>
    </ul>`);
}

// Создание класса.

export default class SortComponent extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._getSortChangeHandler = this._getSortChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _getSortChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    if (document.body.classList.contains('hide-overflow')) {
      document.body.classList.remove('hide-overflow');
    }
    evt.preventDefault();
    this._callback.sortChange(evt.target.dataset.sortType);
  }

  setSortChangeHandler(callback) {
    this._callback.sortChange = callback;
    this.getElement().addEventListener('click', this._getSortChangeHandler);
  }
}
