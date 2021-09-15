// Презентер списка фильмов.

// Импорты.

import dayjs from 'dayjs';
import FilmsSectionView from '../view/films-section.js';
import FilmListMainView from '../view/films.js';
import MoreCommentedFilmsView from '../view/more-commented-films.js';
import RatedFilmsView from '../view/rated-films.js';
import SortView from '../view/sort.js';
import FilmPresenter from './film.js';
import ShowMoreView from '../view/show-more-button.js';
import NoFilmsView from '../view/no-films.js';
import {render, remove, renderPosition} from '../utils/render.js';
import {typeSort} from '../utils/util.js';

// Магические числа.

const FILMS_COUNT_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

//  Создание класса.

export default class FilmsComponent {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderCount = FILMS_COUNT_STEP;
    this._currentSortType = typeSort.DEFAULT;
    this._sortComponent = new SortView();
    this._filmsSectionComponent = new FilmsSectionView();
    this._mainListComponent = new FilmListMainView();
    this._moreCommentedFilmsComponent = new MoreCommentedFilmsView();
    this._ratedFilmsComponent = new RatedFilmsView();
    this._showMoreComponent = new ShowMoreView();
    this._noFilmsComponent = new NoFilmsView();
    this._newFilmData = new Map();
    this._newRatedData = new Map();
    this._newCommentedData = new Map();
    this._handleShowMore = this._handleShowMore.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleRatedChange = this._handleRatedChange.bind(this);
    this._handleCommentedChange = this._handleCommentedChange.bind(this);
    this._handleSortChange = this._handleSortChange.bind(this);
  }

  init(cards) {
    this._cards = cards.slice();
    this._sourcedFilms = this._cards.slice();
    this._ratedDataFilms = [...cards]
      .sort((a, b) => (b.filmInfo.totalRating > a.filmInfo.totalRating) ? 1 : -1)
      .slice(0, 2);
    this._mostDataComments = [...cards]
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 2);
    this._renderFilms();
  }

  _handleCardChange(updatedFilm) {
    this._newFilmData.get(updatedFilm.id).init(updatedFilm);
  }

  _handleRatedChange(updatedFilm) {
    this._newRatedData.get(updatedFilm.id).init(updatedFilm);
  }

  _handleCommentedChange(updatedFilm) {
    this._newCommentedData.get(updatedFilm.id).init(updatedFilm);
  }

  _renderFilm(container, card, type = '') {
    if (type === 'rated') {
      const filmRated = new FilmPresenter(container, this._handleRatedChange);
      filmRated.init(card);
      this._newRatedData.set(card.id, filmRated);
      return;
    }

    if (type === 'commented') {
      const filmCommented = new FilmPresenter(container, this._handleCommentedChange);
      filmCommented.init(card);
      this._newCommentedData.set(card.id, filmCommented);
      return;
    }
    const presenter = new FilmPresenter(container, this._handleCardChange);
    presenter.init(card);
    this._newFilmData.set(card.id, presenter);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case typeSort.DATE:
        this._cards
          .sort((a, b) => dayjs(b.filmInfo.release.date).diff(dayjs(a.filmInfo.release.date)));
        break;
      case typeSort.RATING:
        this._cards
          .sort((a, b) => (b.filmInfo.totalRating > a.filmInfo.totalRating) ? 1 : -1);
        break;
      default:
        this._cards = this._sourcedFilms.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmsList();
    this._renderFilms();
  }

  _clearFilmsList() {
    this._newFilmData.forEach((presenter) => presenter.destroy());
    this._newCommentedData.forEach((presenter) => presenter.destroy());
    this._newRatedData.forEach((presenter) => presenter.destroy());
    this._newFilmData.clear();
    this._newCommentedData.clear();
    this._newRatedData.clear();
    this._renderCount = FILMS_COUNT_STEP;
    remove(this._showMoreComponent);
  }

  _renderSort() {
    render(this._filmsContainer, this._sortComponent, renderPosition.BEFOREEND);
    this._sortComponent.setSortChangeHandler(this._handleSortChange);
  }

  _renderFilmCards(container, from, to, data, type) {
    data
      .slice(from, to)
      .forEach((card) => this._renderFilm(container, card, type));
  }

  _renderFilmsContainer() {
    render(this._filmsContainer, this._filmsSectionComponent, renderPosition.BEFOREEND);
  }

  _renderFilmsListMain() {
    render(this._filmsSectionComponent, this._mainListComponent, renderPosition.BEFOREEND);
    this.cardMainContainer = this._mainListComponent.getElement().querySelector('.films-list__container');
    this._renderFilmCards(this.cardMainContainer, 0, FILMS_COUNT_STEP, this._cards);
    if (this._cards.length > FILMS_COUNT_STEP) {
      this._renderShowMore();
    }
  }

  _renderRatedFilms() {
    render(this._filmsSectionComponent, this._ratedFilmsComponent, renderPosition.BEFOREEND);
    this.cardRatedContainer = this._ratedFilmsComponent.getElement().querySelector('.films-list__container');
    this._renderFilmCards(this.cardRatedContainer, 0, EXTRA_FILMS_COUNT, this._ratedDataFilms, 'rated');
  }

  _renderMoreCommentedFilms() {
    render(this._filmsSectionComponent, this._moreCommentedFilmsComponent, renderPosition.BEFOREEND);
    this.cardComentedContainer = this._moreCommentedFilmsComponent.getElement().querySelector('.films-list__container');
    this._renderFilmCards(this.cardComentedContainer, 0, EXTRA_FILMS_COUNT, this._mostDataComments, 'commented');
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._noFilmsComponent, renderPosition.BEFOREEND);
  }

  _handleShowMore() {
    this._renderFilmCards(this.cardMainContainer, this._renderCount, this._renderCount + FILMS_COUNT_STEP, this._cards);
    this._renderCount += FILMS_COUNT_STEP;

    if (this._renderCount >= this._cards.length) {
      remove(this._showMoreComponent);
    }
  }

  _renderShowMore() {
    render(this._mainListComponent, this._showMoreComponent, renderPosition.BEFOREEND);
    this._showMoreComponent.setClickHandler(this._handleShowMore);
  }

  _renderFilms() {
    if (this._cards.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    this._renderFilmsContainer();
    this._renderFilmsListMain();
    this._renderRatedFilms();
    this._renderMoreCommentedFilms();
  }
}

