// Модель сортировки.

// Импорты.

import AbstractObserver from '../utils/abstract-observer.js';
import {filterTypes} from '../utils/util.js';

// Создание класса.

export default class FiltersModelComponent extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = filterTypes.ALL;
  }

  setFilter(typeUpdate, filter) {
    this._activeFilter = filter;
    this._notify(typeUpdate, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
