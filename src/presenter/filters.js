// Импорты.

import NavigationView from '../view/navigation.js';
import {renderPosition, render, replace, remove } from '../utils/render.js';
import {filter, filterType, updateType} from '../utils/util.js';

// Создание класса.

export default class FilterComponent {
  constructor(filtersContainer, filmsModel, filtersModel) {
    this._filterContainer = filtersContainer;
    this._filtersModel = filtersModel;
    this._filmsModel = filmsModel;
    this._filterComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatsPageChange = this._handleStatsPageChange.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilter();
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new NavigationView(filters, this._filtersModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setPageStatsChangeHandler(this._handleStatsPageChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, renderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(typeFilter) {
    if (this._filtersModel.getFilter() === typeFilter) {
      return;
    }

    this._filtersModel.setFilter(updateType.MAJOR, typeFilter);
  }

  _handleStatsPageChange(typeFilter) {
    if (this._filterModel.getFilter() === typeFilter) {
      return;
    }

    this._filterModel.setFilter(updateType.STATS, typeFilter);
  }

  _getFilter() {
    const films = this._filmsModel.getFilms();
    return [
      {
        type: filterType.ALL,
        name: 'All movies',
        count: filter[filterType.ALL](films).length,
      },
      {
        type: filterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[filterType.WATCHLIST](films).length,
      },
      {
        type: filterType.HISTORY,
        name: 'History',
        count: filter[filterType.HISTORY](films).length,
      },
      {
        type: filterType.FAVORITES,
        name: 'Favorites',
        count: filter[filterType.FAVORITES](films).length,
      },
      {
        type: filterType.STATS,
      },
    ];
  }
}
