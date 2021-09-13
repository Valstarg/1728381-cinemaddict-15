// Попап окно.

// Импорты.

import * as dayjs from 'dayjs';
import {getPopupClass} from '../utils/util.js';
import AbstractionView from './abstraction.js';

// Попап окно.

// Шаблон комментария.

function createCommentTemplate(comment) {
  const {text, authorName, emoji, date} = comment;
  const dateFormat = dayjs(date).format('DD/MM/YYYY HH:mm');

  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
                <p class="film-details__comment-text">${text}</p>
                <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${authorName}</span>
                    <span class="film-details__comment-day">${dateFormat}</span>
                    <button class="film-details__comment-delete">Delete</button>
                </p>
            </div>
          </li>`;
}

// Отрисовка попап окна.

function createPopupTemplate(parameter) {
  const {poster, ageRating, title, alternativeTitle, totalRating, director, runtime, description, genres} = parameter.filmInfo;
  const {writers, actors} = parameter.filmInfo;
  const date = dayjs(parameter.filmInfo.release.date).format('DD MMMM YYYY');
  const {releaseCountry} = parameter.filmInfo.release;
  const genreCount = genres.length > 1 ? 'Genres' : 'Genre';
  const getGenres = (genresType) => genresType.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
  const {watchlist, favorite, history} = parameter.userDetails;
  const comments = parameter.comments;
  const numberOfComments = comments.length;
  const filterItemsTemplate = comments
    .map((comment) => createCommentTemplate(comment))
    .join('');

  return `<section class="film-details">
            <form class="film-details__inner" action="" method="get">
                <div class="film-details__top-container">
                    <div class="film-details__close">
                        <button class="film-details__close-btn" type="button">close</button>
                    </div>
                    <div class="film-details__info-wrap">
                        <div class="film-details__poster">
                            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
                            <p class="film-details__age">${ageRating}</p>
                        </div>
                        <div class="film-details__info">
                            <div class="film-details__info-head">
                                <div class="film-details__title-wrap">
                                    <h3 class="film-details__title">${title}</h3>
                                    <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                                </div>
                                <div class="film-details__rating">
                                    <p class="film-details__total-rating">${totalRating}</p>
                                </div>
                            </div>
                            <table class="film-details__table">
                                <tr class="film-details__row">
                                    <td class="film-details__term">Director</td>
                                    <td class="film-details__cell">${director}</td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">Writers</td>
                                    <td class="film-details__cell">${writers.join(', ')}</td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">Actors</td>
                                    <td class="film-details__cell">${actors.join(', ')}</td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">Release Date</td>
                                    <td class="film-details__cell">${date}</td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">Runtime</td>
                                    <td class="film-details__cell">${runtime}</td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">Country</td>
                                    <td class="film-details__cell">${releaseCountry}</td>
                                </tr>
                                <tr class="film-details__row">
                                    <td class="film-details__term">${genreCount}</td>
                                    <td class="film-details__cell">${getGenres(genres)}</td>
                                </tr>
                            </table>
                            <p class="film-details__film-description">${description}</p>
                        </div>
                    </div>
                    <section class="film-details__controls">
                        <button type="button" class="${getPopupClass(watchlist)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
                        <button type="button" class="${getPopupClass(history)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
                        <button type="button" class="${getPopupClass(favorite)}  film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
                    </section>
                </div>
                <div class="film-details__bottom-container">
                    <section class="film-details__comments-wrap">
                        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${numberOfComments}</span></h3>
                        <ul class="film-details__comments-list">
                        ${filterItemsTemplate}
                        </ul>
                        <div class="film-details__new-comment">
                            <div class="film-details__add-emoji-label"></div>
                            <label class="film-details__comment-label">
                                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                            </label>
                            <div class="film-details__emoji-list">
                                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                                <label class="film-details__emoji-label" for="emoji-smile">
                                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                                </label>
                                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                                <label class="film-details__emoji-label" for="emoji-sleeping">
                                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                                </label>
                                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                                <label class="film-details__emoji-label" for="emoji-puke">
                                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                                </label>
                                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                                <label class="film-details__emoji-label" for="emoji-angry">
                                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                                </label>
                            </div>
                        </div>
                    </section>
                </div>
            </form>
        </section>`;
}

// Создание класса. Абстракция и наследование. Добавил обработчик.

export default class PopupTemplate extends AbstractionView {
  constructor(parameter) {
    super();
    this._parameter= parameter;
    this._getClosePopupHandler = this._getClosePopupHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._parameter);
  }

  _getClosePopupHandler(evt) {
    this._callback.closePopupFilm();
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._callback.closePopupFilm();
    }
    document.querySelector('body').classList.remove('hide-overflow');
  }

  setCloseClickHandler(callback) {
    this._callback.closePopupFilm = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._getClosePopupHandler);
    document.addEventListener('keydown', this._getClosePopupHandler);
  }
}
