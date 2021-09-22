// Импорты.

import AbstractObserver from '../utils/abstract-observer.js';
import {filterType} from '../utils/util.js';

// Создание класса.

export default class FilterComponent extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = filterType.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
