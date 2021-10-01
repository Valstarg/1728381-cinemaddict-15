// Презентер списка фильмов.

// Импорты.

import dayjs from 'dayjs';
import {api} from '../api/api.js';
import FilmsSectionView from '../view/films-section.js';
import FilmListMainView from '../view/films.js';
import LoadView from '../view/load.js';
import StatView from '../view/stat.js';
import SortView from '../view/sort.js';
import ShowMoreView from '../view/show-more-button.js';
import MoreCommentedFilmsView from '../view/more-commented-films.js';
import RatedFilmsView from '../view/rated-films.js';
import NoFilmsView from '../view/no-films.js';
import FilmPresenter from './film.js';
import {render, remove, renderPosition} from '../utils/render.js';
import {sortTypes, filter, updateType, filterTypes, statFilterTypes, userAction} from '../utils/util.js';

// Магические числа.

const FILMS_COUNT_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

//  Создание класса.

export default class FilmsPresenterComponent {
  constructor(filmsContainer, filmsModel, filtersModel) {
    this._filmsContainer = filmsContainer;
    this._filmsModel = filmsModel;
    this._filtersModel = filtersModel;
    this._renderCount = FILMS_COUNT_STEP;
    this._currentSortType = sortTypes.DEFAULT;
    this._typeFilter = filterTypes.ALL;
    this._typeFilterStat = statFilterTypes.ALL;
    this._sortComponent = null;
    this._showMoreComponent = null;
    this._noFilmsComponent = null;
    this._userStatComponent = null;
    this._isLoad = true;
    this._filmsSectionComponent = new FilmsSectionView();
    this._mainListComponent = new FilmListMainView();
    this._loadComponent = new LoadView();
    this._moreCommentedFilmsComponent = new MoreCommentedFilmsView();
    this._ratedFilmsComponent = new RatedFilmsView();
    this._newFilmData = new Map();
    this._ratedFilmData = new Map();
    this._moreCommentedFilmData = new Map();
    this._handleSortChange = this._handleSortChange.bind(this);
    this._handleStatsFilter = this._handleStatsFilter.bind(this);
    this._handleShowMore = this._handleShowMore.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsPage();
  }

  _getFilms() {
    this._typeFilter = this._filtersModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[this._typeFilter](films);
    switch (this._currentSortType) {
      case sortTypes.DATE:
        return filtredFilms.slice().sort((a, b) => dayjs(b.filmInfo.release.date).diff(dayjs(a.filmInfo.release.date)));
      case sortTypes.RATING:
        return filtredFilms.slice().sort((a, b) => (b.filmInfo.totalRating > a.filmInfo.totalRating) ? 1 : -1);
    }
    return filtredFilms;
  }

  _handleViewAction(actionType, typeUpdate, update) {
    switch (actionType) {
      case userAction.LOAD_COMMENTS:
        api.getComments(update.film.id).then((comments) => {
          update.comments = comments;
          this._filmsModel.addComment(typeUpdate, update);
        });
        break;
      case userAction.UPDATE_FILM:
        api.updateFilm(update).then((film) => {
          api.getComments(update.id).then((comments) => {
            this._comments = comments;
            this._filmsModel.updateFilms(typeUpdate, {film, comments});
          });
        });
        break;
      case userAction.ADD_COMMENT:
        this._filmsModel.addComment(typeUpdate, update);
        break;
      case userAction.DELETE_COMMENT:
        this._filmsModel.deleteComment(typeUpdate, update);
        break;
    }
  }

  _initFilmCardViewPresenter(presenters, data) {
    if (presenters.has(data.film.id)) {
      presenters.get(data.film.id).init(data.film, data.comments);
    }
  }

  _handleModelEvent(typeUpdate, data) {
    switch (typeUpdate) {
      case updateType.PATCH:
        this._initFilmCardViewPresenter(this._newFilmData, data);
        this._initFilmCardViewPresenter(this._ratedFilmData, data);
        this._initFilmCardViewPresenter(this._moreCommentedFilmData, data);
        break;
      case updateType.MINOR:
        this._clearFilmsList();
        this._renderFilmsPage();
        break;
      case updateType.MAJOR:
        this._clearFilmsList({ resetRenderedFilmCount: true, resetSortType: true });
        this._renderFilmsPage();
        break;
      case updateType.STATS:
        this._clearFilmsList();
        this._renderStats();
        break;
      case updateType.INIT:
        this._isLoad = false;
        remove(this._loadComponent);
        this._renderFilmsPage();
        break;
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortChangeHandler(this._handleSortChange);
    render(this._filmsContainer, this._sortComponent, renderPosition.BEFOREEND);
  }

  _handleSortChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmsList({resetRenderedFilmCount: true});
    this._renderFilmsPage();
  }

  _renderStats() {
    if (this._userStatComponent !== null) {
      this._userStatComponent = null;
    }
    this._typeFilter = filterTypes.HISTORY;
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[this._typeFilter](films);
    this._userStatComponent = new StatView(this._typeFilterStat, filtredFilms);
    render(this._filmsContainer, this._userStatComponent, renderPosition.BEFOREEND);
    this._userStatComponent.setFilterChangeHandler(this._handleStatsFilter);
  }

  _handleStatsFilter(statsFilter) {
    if (this._typeFilterStat === statsFilter) {
      return;
    }
    this._typeFilterStat = statsFilter;
    remove(this._userStatComponent);
    this._renderStats();
  }

  _clearFilmsList({resetRenderedFilmCount = false, resetSortType = false,
    saveRenderedFilm = false} = {}) {
    this._newFilmData.forEach((presenter) => presenter.destroy());
    this._ratedFilmData.forEach((presenter) => presenter.destroy());
    this._moreCommentedFilmData.forEach((presenter) => presenter.destroy());
    this._newFilmData.clear();
    this._ratedFilmData.clear();
    this._moreCommentedFilmData.clear();
    remove(this._loadComponent);
    remove(this._sortComponent);
    remove(this._showMoreComponent);
    remove(this._userStatComponent);
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
      this._currentSortType = sortTypes.DEFAULT;
      this._typeFilterStat = statFilterTypes.ALL;
    }
  }

  _renderLoad() {
    render(this._filmsContainer, this._loadComponent, renderPosition.BEFOREEND);
  }

  _renderFilm(card, container, data) {
    const cardPresenter = new FilmPresenter(container, this._handleViewAction, this._typeFilter);
    cardPresenter.init(card);
    data.set(card.id, cardPresenter);
  }

  _renderFilms(cards, container, data) {
    cards.forEach((card) => this._renderFilm(card, container, data));
  }

  _renderFilmsContainer() {
    render(this._filmsContainer, this._filmsSectionComponent, renderPosition.BEFOREEND);
  }

  _renderFilmsMain() {
    render(this._filmsSectionComponent, this._mainListComponent, renderPosition.BEFOREEND);
    this.cardMainContainer = this._mainListComponent.getElement().querySelector('.films-list__container');

    const films = this._getFilms();
    const filmCount = films.length;

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderCount)), this.cardMainContainer, this._newFilmData);
  }

  _renderFilmsRated() {
    render(this._filmsSectionComponent, this._ratedFilmsComponent, renderPosition.BEFOREEND);
    this._cardRatedContainer = this._ratedFilmsComponent.getElement().querySelector('.films-list__container');

    const filmsTopRated = this._filmsModel.getFilms().filter((card) => card.filmInfo.totalRating > EXTRA_FILMS_COUNT)
      .sort((a, b) => (b.filmInfo.totalRating > a.filmInfo.totalRating) ? 1 : -1)
      .slice(0, 2);
    this._renderFilms(filmsTopRated, this._cardRatedContainer, this._ratedFilmData);
  }

  _renderFilmsCommented() {
    render(this._filmsSectionComponent, this._moreCommentedFilmsComponent, renderPosition.BEFOREEND);
    this._cardMostCommentedContainer = this._moreCommentedFilmsComponent.getElement().querySelector('.films-list__container');

    const filmsMostCommented = this._filmsModel.getFilms().slice()
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 2);
    this._renderFilms(filmsMostCommented, this._cardMostCommentedContainer, this._moreCommentedFilmData);
  }

  _renderNoFilms() {
    this._noFilmsComponent = new NoFilmsView(this._typeFilter);
    render(this._filmsContainer, this._noFilmsComponent, renderPosition.BEFOREEND);
  }

  _handleShowMore() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(this._renderCount, this._renderCount + FILMS_COUNT_STEP);
    this._renderFilms(films, this.cardMainContainer, this._newFilmData);
    this._renderCount += FILMS_COUNT_STEP;

    if (this._renderCount >= filmCount) {
      remove(this._showMoreComponent);
    }
  }

  _renderShowMore() {
    if (this._showMoreComponent !== null) {
      this._showMoreComponent = null;
    }
    this._showMoreComponent = new ShowMoreView();
    this._showMoreComponent.setClickHandler(this._handleShowMore);
    render(this._mainListComponent, this._showMoreComponent, renderPosition.BEFOREEND);
  }

  _renderFilmsPage() {
    if (this._isLoad) {
      this._renderLoad();
      return;
    }
    const films = this._getFilms();
    const filmCount = films.length;
    if (filmCount === 0) {
      this._renderNoFilms();
      this._renderFilmsContainer();
      this._renderFilmsRated();
      this._renderFilmsCommented();
      return;
    }
    this._renderSort();
    this._renderFilmsContainer();
    this._renderFilmsMain();
    this._renderFilmsRated();
    this._renderFilmsCommented();
    if (filmCount > this._renderCount) {
      this._renderShowMore();
    }
  }
}
