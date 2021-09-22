// Презентер списка фильмов.

// Импорты.

import dayjs from 'dayjs';
import FilmsSectionView from '../view/films-section.js';
import FilmListMainView from '../view/films.js';
import StatView from '../view/stat.js';
import SortView from '../view/sort.js';
import FilmPresenter from './film.js';
import ShowMoreView from '../view/show-more-button.js';
import NoFilmsView from '../view/no-films.js';
import {render, remove, renderPosition} from '../utils/render.js';
import {typeSort, filter, updateType, filterType, StatsFilterType, isWatchingDate} from '../utils/util.js';

// Магические числа.

const FILMS_COUNT_STEP = 5;

//  Создание класса.

export default class FilmsComponent {
  constructor(filmsContainer, filmsModel, filtersModel) {
    this._filmsContainer = filmsContainer;
    this._filmsModel = filmsModel;
    this._filtersModel = filtersModel;
    this._renderCount = FILMS_COUNT_STEP;
    this._currentSortType = typeSort.DEFAULT;
    this._filterType = filterType.ALL;

    this._statsFilterType = StatsFilterType.ALL;///

    this._sortComponent = null;
    this._showMoreComponent = null;
    this._noFilmsComponent = null;

    this._userStatisticComponent = null;///

    this._filmsSectionComponent = new FilmsSectionView();
    this._mainListComponent = new FilmListMainView();
    this._newFilmData = new Map();
    this._handleSortChange = this._handleSortChange.bind(this);

    this._handleStatsFilter = this._handleStatsFilter.bind(this);///

    this._handleShowMore = this._handleShowMore.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    //this._filmsModel.addObserver(this._handleModelEvent);
    //this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
    this._renderFilmsBoard();
  }

  _getFilms() {
    this._filterType = this._filtersModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[this._filterType](films);
    switch (this._currentSortType) {
      case typeSort.DATE:
        return filtredFilms.slice().sort((a, b) => dayjs(b.filmInfo.release.date).diff(dayjs(a.filmInfo.release.date)));
      case typeSort.RATING:
        return filtredFilms.slice().sort((a, b) => (b.filmInfo.totalRating > a.filmInfo.totalRating) ? 1 : -1);
    }
    return filtredFilms;
  }

  _handleViewAction(typeUpdate, update) {
    this._filmsModel.updateFilms(typeUpdate, update);
  }

  _handleModelEvent(typeUpdate, data) {
    switch (typeUpdate) {
      case updateType.PATCH:
        this._newFilmData.get(data.id).init(data);
        break;
      case updateType.MAJOR:
        this._clearFilmsList({ resetRenderedFilmCount: true, resetSortType: true });
        this._renderFilmsBoard();
        break;
      case updateType.STATS:
        this._clearFilmsList();
        this._renderStats();
        break;
    }
  }

  // отрисовка блока сортировки
  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortChangeHandler(this._handleSortChange);
    render(this._filmsContainer, this._sortComponent, renderPosition.BEFOREEND);
  }

  // Обработчик при клике на соответсвующую сортировку
  _handleSortChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmsList({resetRenderedFilmCount: true});
    this._renderFilmsBoard();
  }

  //_clearFilmsList({resetRenderedFilmCount = false, resetSortType = false} = {}) {
  //const filmCount = this._getFilms().length;
  // Отрисовка страницы статистики
  _renderStats() {
    if (this._userStatisticComponent !== null) {
      this._userStatisticComponent = null;
    }
    this._filterType = filterType.HISTORY;
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[this._filterType](films);
    const filtredStastFilms = isWatchingDate(filtredFilms, this._statsFilterType);
    this._userStatisticComponent = new StatView(this._statsFilterType, filtredStastFilms);
    render(this._filmsContainer, this._userStatisticComponent, renderPosition.BEFOREEND);
    this._userStatisticComponent.setFilterTypeChangeHandler(this._handleStatsFilter);
  }

  _handleStatsFilter(statsFilter) {
    if (this._statsFilterType === statsFilter) {
      return;
    }

    this._statsFilterType = statsFilter;
    remove(this._userStatisticComponent);
    this._renderStats();
  }

  _clearFilmsList({ resetRenderedFilmCount = false, resetSortType = false,
    saveRenderedFilm = false } = {}) {
    this._newFilmData.forEach((presenter) => presenter.destroy());
    this._newFilmData.clear();
    remove(this._sortComponent);
    remove(this._showMoreComponent);
    remove(this._userStatisticComponent);
    remove(this._filmsSectionComponent);

    if (this._noFilmsComponent) {
      remove(this._noFilmsComponent);
    }

    if (resetRenderedFilmCount) {
      this._renderCount = FILMS_COUNT_STEP;
    } else if (saveRenderedFilm) {
      const filmCount = this._getFilms().length;
      this._renderCount = Math.min(filmCount, this._renderCount);
    }

    if (resetSortType) {
      this._currentSortType = typeSort.DEFAULT;
    }
  }

  // отрисовка одной карточки фильма
  _renderFlim(card) {
    const cardPresenter = new FilmPresenter(this.cardMainContainer, this._handleViewAction);
    cardPresenter.init(card);
    this._newFilmData.set(card.id, cardPresenter);
  }

  // отрисовка заданого массива карточек
  _renderFilms(cards) {
    cards.forEach((card) => this._renderFlim(card));
  }

  // Отрисовка контенера листа фильма и контейнера в листе фильма
  _renderFilmsContainer() {
    render(this._filmsContainer, this._filmsSectionComponent, renderPosition.BEFOREEND);

    render(this._filmsSectionComponent, this._mainListComponent, renderPosition.BEFOREEND);
    this.cardMainContainer = this._mainListComponent.getElement().querySelector('.films-list__container');
  }

  // отрисока текста при отсутствии фильмов
  _renderNoFilms() {
    this._noFilmsComponent = new NoFilmsView(this._filterType);
    render(this._filmsContainer, this._noFilmsComponent, renderPosition.BEFOREEND);
  }

  // обрабочик при нажатии кнопки показать еще
  _handleShowMore() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(this._renderCount, this._renderCount + FILMS_COUNT_STEP);
    this._renderFilms(films);
    this._renderCount += FILMS_COUNT_STEP;

    if (this._renderCount >= filmCount) {
      remove(this._showMoreComponent);
    }
  }

  // отрисовка кнопки показать еще
  _renderShowMore() {
    if (this._showMoreComponent !== null) {
      this._showMoreComponent = null;
    }
    this._showMoreComponent = new ShowMoreView();
    this._showMoreComponent.setClickHandler(this._handleShowMore);
    render(this._mainListComponent, this._showMoreComponent, renderPosition.BEFOREEND);
  }

  // Отрисовка основного списка фильмов
  _renderFilmsBoard() {
    const films = this._getFilms();
    const filmCount = films.length;
    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    this._renderFilmsContainer();
    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderCount)));
    if (filmCount > this._renderCount) {
      this._renderShowMore();
    }
  }
}

