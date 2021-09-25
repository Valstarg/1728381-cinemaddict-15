// Карточка фильма.

// Импорты.

import dayjs from 'dayjs';
import he from 'he';
import {getFirstArrayElement, getCardClass, getSliceText} from '../utils/util.js';
import AbstractView from './abstraction.js';

// Добавляем данные.

function createFilmCardTemplate(parameter) {
  const {title, runtime, genres, poster, description} = parameter.filmInfo;
  const rating = parameter.filmInfo.totalRating;
  const date = dayjs(parameter.filmInfo.release.date).format('YYYY');
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const numberOfComments = parameter.comments.length;
  const commentsTitle = numberOfComments === 1 ? 'Comment' : 'Comments';
  const {watchlist, favorite, history} = parameter.userDetails;

  return `<article class="film-card">
             <h3 class="film-card__title">${title}</h3>
             <p class="film-card__rating">${rating}</p>
             <p class="film-card__info">
               <span class="film-card__year">${date}</span>
               <span class="film-card__duration">${hours}h ${minutes}m</span>
               <span class="film-card__genre">${getFirstArrayElement(genres)}</span>
             </p>
             <img src="${poster}" alt="" class="film-card__poster">
             <p class="film-card__description">${getSliceText(he.encode(description))}</p>
             <a class="film-card__comments">${numberOfComments} ${commentsTitle}</a>
             <div class="film-card__controls">
               <button class="${getCardClass(watchlist)} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
               <button class="${getCardClass(history)} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
               <button class="${getCardClass(favorite)} film-card__controls-item--favorite" type="button">Mark as favorite</button>
             </div>
           </article>`;
}

// Создание класса.

export default class FilmCardComponent extends AbstractView {
  constructor(parameter) {
    super();
    this._parameter = parameter;
    this._filmCard = this.getElement();
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._openClickHandler = this._openClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._parameter);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    this._callback.favoriteClick(this._parameter);
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    this._callback.historyClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    this._callback.watchlistClick();
  }

  _openClickHandler(evt) {
    evt.preventDefault();
    this._callback.openPopup();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this._filmCard.querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this._filmCard.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._historyClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this._filmCard.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setOpenClickHandler(callback) {
    this._callback.openPopup = callback;
    this._filmCard.querySelector('.film-card__poster').addEventListener('click', this._openClickHandler);
    this._filmCard.querySelector('.film-card__comments').addEventListener('click', this._openClickHandler);
    this._filmCard.querySelector('.film-card__title').addEventListener('click', this._openClickHandler);
  }
}
