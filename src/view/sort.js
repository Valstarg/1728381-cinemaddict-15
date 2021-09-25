// Сортировка фильмов.

// Импорты.

import AbstractView from './abstraction.js';
import {sortTypes} from '../utils/util.js';

// Отрисовка списка сортировки.

export function createSortTemplate(currentSortType) {
  return `<ul class="sort">
      <li>
        <a href="#" data-sort-type="${sortTypes.DEFAULT}" class="sort__button ${currentSortType === sortTypes.DEFAULT ? 'sort__button--active' : ''}">Sort by default</a>
      </li>
      <li>
        <a href="#" data-sort-type="${sortTypes.DATE}" class="sort__button ${currentSortType === sortTypes.DATE ? 'sort__button--active' : ''}">Sort by date</a>
      </li>
      <li>
        <a href="#" data-sort-type="${sortTypes.RATING}" class="sort__button ${currentSortType === sortTypes.RATING ? 'sort__button--active' : ''}">Sort by rating</a>
      </li>
    </ul>`;
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
