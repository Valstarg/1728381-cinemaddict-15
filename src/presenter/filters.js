// Презентер сортировки.

// Импорты.

import ProfileView from '../view/profile.js';
import NavigationView from '../view/navigation.js';
import {renderPosition, render, replace, remove} from '../utils/render.js';
import {filter, filterTypes, updateType} from '../utils/util.js';

// Создание класса.

export default class FilterComponent {
  constructor(filtersContainer, header, filmsModel, filtersModel) {
    this._filtersContainer = filtersContainer;
    this._filtersModel = filtersModel;
    this._filmsModel = filmsModel;
    this._header = header;
    this._filtersComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleStatsPageChange = this._handleStatsPageChange.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilter();
    const prevFiltersComponent = this._filtersComponent;
    const prevProfileComponent = this._profileComponent;
    this._filtersComponent = new NavigationView(filters, this._filtersModel.getFilter());
    this._profileComponent = new ProfileView(this._getHistoryFilmsCount());
    this._filtersComponent.setFilterChangeHandler(this._handleFilterChange);
    this._filtersComponent.setPageStatsChangeHandler(this._handleStatsPageChange);
    if (prevFiltersComponent === null) {
      render(this._filtersContainer, this._filtersComponent, renderPosition.BEFOREEND);
      render(this._header, this._profileComponent, renderPosition.BEFOREEND);
      return;
    }
    replace(this._profileComponent, prevProfileComponent);
    replace(this._filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
    remove(prevProfileComponent);
  }

  _getHistoryFilmsCount() {
    return filter[filterTypes.HISTORY](this._filmsModel.getFilms()).length;
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterChange(typeFilter) {
    if (this._filtersModel.getFilter() === typeFilter) {
      return;
    }
    this._filtersModel.setFilter(updateType.MAJOR, typeFilter);
  }

  _handleStatsPageChange(typeFilter) {
    if (this._filtersModel.getFilter() === typeFilter) {
      return;
    }
    this._filtersModel.setFilter(updateType.STATS, typeFilter);
  }

  _getFilter() {
    const films = this._filmsModel.getFilms();
    return [
      {
        type: filterTypes.ALL,
        name: 'All movies',
        count: filter[filterTypes.ALL](films).length,
      },
      {
        type: filterTypes.WATCHLIST,
        name: 'Watchlist',
        count: filter[filterTypes.WATCHLIST](films).length,
      },
      {
        type: filterTypes.HISTORY,
        name: 'History',
        count: filter[filterTypes.HISTORY](films).length,
      },
      {
        type: filterTypes.FAVORITES,
        name: 'Favorites',
        count: filter[filterTypes.FAVORITES](films).length,
      },
      {
        type: filterTypes.STATS,
      },
    ];
  }
}
