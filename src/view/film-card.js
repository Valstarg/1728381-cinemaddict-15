// Импорты.

import * as dayjs from 'dayjs';
import {getFirstArrayElement, getCardClass, getSliceText, createTemplate} from '../utils/util.js';

// Карточка фильма.

// Добавляем данные.

function createFilmCardTemplate(parameter) {
  const {title, runtime, genres, poster, description} = parameter.filmInfo;
  const rating = parameter.filmInfo.totalRating;
  const date = dayjs(parameter.filmInfo.release.date).format('YYYY');
  const numberOfComments = parameter.comments.length;
  const {watchlist, favorite} = parameter.userDetails;
  const history = parameter.userDetails.alreadyWatched;

  return `<article class="film-card">
             <h3 class="film-card__title">${title}</h3>
             <p class="film-card__rating">${rating}</p>
             <p class="film-card__info">
               <span class="film-card__year">${date}</span>
               <span class="film-card__duration">${runtime}</span>
               <span class="film-card__genre">${getFirstArrayElement(genres)}</span>
             </p>
             <img src="./images/posters/${poster}" alt="" class="film-card__poster">
             <p class="film-card__description">${getSliceText(description)}</p>
             <a class="film-card__comments">${numberOfComments} comments</a>
             <div class="film-card__controls">
               <button class="${getCardClass(watchlist)} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
               <button class="${getCardClass(history)} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
               <button class="${getCardClass(favorite)} film-card__controls-item--favorite" type="button">Mark as favorite</button>
             </div>
           </article>`;
}

// Создание класса.

export default class filmCard {
  constructor(parameter) {
    this._parameter = parameter;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._parameter);
  }

  getElement() {
    if (!this._element) {
      this._element = createTemplate(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
