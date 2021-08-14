// Импорты.

import * as dayjs from 'dayjs';
import {getFirstArrayElement, getClass, getSliceText} from '../utils/util.js';

// Карточка фильма.
// Добавляем данные.

export function createFilmCardTemplate(parameter) {
  const {title, runtime, genres, poster, description} = parameter.filmInfo;
  const rating = parameter.filmInfo.totalRating;
  const date = dayjs(parameter.filmInfo.release.date).format('YYYY');
  const comments = parameter.comments.length;
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
             <a class="film-card__comments">${comments} comments</a>
             <div class="film-card__controls">
               <button class="${getClass(watchlist)} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
               <button class="${getClass(history)} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
               <button class="${getClass(favorite)} film-card__controls-item--favorite" type="button">Mark as favorite</button>
             </div>
           </article>`;
}
