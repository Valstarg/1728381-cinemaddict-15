// Попап окно.

// Импорты.

import dayjs from 'dayjs';
import he from 'he';
import {getPopupClass} from '../utils/util.js';
import SmartView from './smart.js';
import {getId, getAuthorName} from '../mock/film-data.js';

// Попап окно.

// Шаблон комментария.

function createCommentTemplate(dataComment) {
  const {text, authorName, emoji, date, id} = dataComment;

  function parseDate(d) {
    let newDate;
    if (-604800000 < dayjs(d).diff()) {
      newDate = `${Math.floor(dayjs(d).diff() / -86400000)} days ago`;
      if (newDate === '1 days ago') {
        newDate = '1 day ago';
      }
      if (newDate === '0 days ago') {
        newDate = `${Math.floor(dayjs(d).diff() / -3600000)} hours ago`;
        if (newDate === '1 hours ago') {
          newDate = '1 hour ago';
        }
        if (newDate === '0 hours ago') {
          newDate = `${Math.floor(dayjs(d).diff() / -60000)} min ago`;
          if (newDate === '0 min ago') {
            newDate = 'now';
          }
        }
      }
    }
    if (-604800000 > dayjs(d).diff()) {
      newDate = dayjs(d).format('DD/MM/YYYY HH:mm');
    }
    return newDate;
  }
  const dateFormat = parseDate(date);

  return `<li class="film-details__comment" value=${id}>
            <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
                <p class="film-details__comment-text">${he.encode(text)}</p>
                <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${authorName}</span>
                    <span class="film-details__comment-day">${dateFormat}</span>
                    <button class="film-details__comment-delete" value=${id}>Delete</button>
                </p>
            </div>
          </li>`;
}

// Отрисовка попап окна.

function createPopupTemplate(data, dataComment) {
  const {poster, ageRating, title, alternativeTitle, totalRating, director, runtime, description, genres} = data.filmInfo;
  const {writers, actors} = data.filmInfo;
  const date = dayjs(data.filmInfo.release.date).format('DD MMMM YYYY');
  const {releaseCountry} = data.filmInfo.release;
  const genreCount = genres.length > 1 ? 'Genres' : 'Genre';
  const getGenres = (genresType) => genresType.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
  const {watchlist, favorite, history} = data.userDetails;
  const comments = dataComment;
  const {emojiName} = data;
  const numberOfComments = comments.length;
  const commentsTitle = numberOfComments === 1 ? 'Comment' : 'Comments';
  const filterItemsTemplate = comments
    .map((comment) => createCommentTemplate(comment))
    .join('');
  function getTime() {                                     // Отрисовка времени в минутах. Вынести в отдельную структуру.
    const hours = Math.floor(runtime/60);
    const minutes = runtime%60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

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
                                    <td class="film-details__cell">${getTime()}</td>
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
                            <p class="film-details__film-description">${he.encode(description)}</p>
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
                        ${filterItemsTemplate.length ? `<h3 class="film-details__comments-title">${commentsTitle}<span class="film-details__comments-count">${numberOfComments}</span></h3>
                        <ul class="film-details__comments-list">${filterItemsTemplate}</ul>` : ''}
                        <div class="film-details__new-comment">
                            <div class="film-details__add-emoji-label">
                            ${emojiName !== null ? `<img src="./images/emoji/${emojiName}.png" width="55" height="55" alt="emoji">` : ''}
                            </div>

                            <label class="film-details__comment-label">
                                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                            </label>

                            <div class="film-details__emoji-list">
                                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emojiName === 'smile' ? 'checked' : ''}>
                                <label class="film-details__emoji-label" for="emoji-smile">
                                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                                </label>
                                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emojiName === 'sleeping' ? 'checked' : ''}>
                                <label class="film-details__emoji-label" for="emoji-sleeping">
                                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                                </label>
                                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emojiName === 'puke' ? 'checked' : ''}>
                                <label class="film-details__emoji-label" for="emoji-puke">
                                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                                </label>
                                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emojiName === 'angry' ? 'checked' : ''}>
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

// Создание класса.

// module6.
// 1. Создать smart.
// 2. Заменить abstract.
// 3. Внести изменения в попап.

export default class PopupComponent extends SmartView {
  constructor(parameter) {
    super();
    this._data = PopupComponent.paramToData(parameter);
    this._comments = this._data.comments.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
    this._getClosePopupHandler = this._getClosePopupHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._emojiHandler = this._emojiHandler.bind(this);
    this._textAreaHandler = this._textAreaHandler.bind(this);
    this._getDeleteClickHandler = this._getDeleteClickHandler.bind(this);
    this._getAddClickHandler = this._getAddClickHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._data, this._comments);
  }

  // Пока не уверен.

  // reset(parameter) {
  //   this.updateData(PopupComponent.dataToParam(parameter));
  // }

  // В smart класс.

  /*updateData(update) {                  // Обновляем состояние.
    if (!update) {
      return;
    }
    this._data = { ...this._data, ...update };
    this.updateElement();
  }

  updateElement() {                       // Обновляем элемент.
    const element = this.getElement();
    const parent = element.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, element);
    this.restoreHandlers();
  }*/

  restoreHandlers() {                     // Возвращаем обработчики после рендеринга.
    this._setInnerHandlers();
    this.setHistoryClickHandler(this._callback.historyClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setCloseClickHandler(this._callback.closePopupFilm);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setAddClickHandler(this._callback.addClick);
  }

  _setInnerHandlers() {                   // Сохраняем внутренние обработчики.
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('input', this._emojiHandler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._textAreaHandler);
  }

  _textAreaHandler(evt) {                 // Сохранение текста в окне комментария.
    evt.preventDefault();
    this.updateData({
      ...this._data,
      textComment: '',
    }, true);
  }

  _emojiHandler(evt) {                    // Добавление смайла и обновление данных.
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.updateData({
        ...this._data,
        emojiName: evt.target.value,
        textComment: this.getElement().querySelector('.film-details__comment-input').value,
        scroll: this.getElement().scrollTop,
      });
    }
    this.getElement().querySelector('.film-details__comment-input').value = this._data.textComment;
    this.getElement().scrollTop = this._data.scroll;
  }

  static paramToData(parameter) {          // Преобразование данных.
    return {
      ...parameter, emojiName: null, textComment: '',
    };
  }

  static dataToParam(data) {
    data = { ...data };
    delete data.textComment;
    delete data.emojiName;
    delete data.scroll;
    return data;
  }

  _getClosePopupHandler(evt) {
    evt.preventDefault();
    this._callback.closePopupFilm();
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      ...this._data,
      userDetails: {
        ...this._data.userDetails,
        history: !this._data.userDetails.history,
      },
      scroll: this.getElement().scrollTop,
    });
    this.getElement().scrollTop = this._data.scroll;
    this._callback.historyClick(PopupComponent.dataToParam(this._data));
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      ...this._data,
      userDetails: {
        ...this._data.userDetails,
        favorite: !this._data.userDetails.favorite,
      },
      scroll: this.getElement().scrollTop,
    });
    this.getElement().scrollTop = this._data.scroll;
    this._callback.favoriteClick(PopupComponent.dataToParam(this._data));
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      ...this._data,
      userDetails: {
        ...this._data.userDetails,
        watchlist: !this._data.userDetails.watchlist,
      },
      scroll: this.getElement().scrollTop,
    });

    this.getElement().scrollTop = this._data.scroll;
    this._callback.watchlistClick(PopupComponent.dataToParam(this._data));
  }

  _getDeleteClickHandler(evt) {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }

    const index = this._comments.findIndex((comment) => comment.id === evt.target.value);
    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this.updateData(
      {...this._data, comments: this._comments, scroll: this.getElement().scrollTop},
    );

    evt.preventDefault();
    this.getElement().scrollTop = this._data.scroll;
    this._callback.deleteClick(PopupComponent.dataToParam(this._data));
  }

  _getAddClickHandler(evt) {
    if (evt.keyCode === 13 && evt.ctrlKey) {
      const newComment = {
        id: getId(),
        text: this.getElement().querySelector('.film-details__comment-input').value,
        authorName: getAuthorName(),
        emoji: this._data.emojiName ? `${this._data.emojiName}.png` : 'smile.png',
        date: dayjs(),
      };

      this._comments = [...this._comments, newComment];
      this.updateData(
        {...this._data, comments: this._comments, scroll: this.getElement().scrollTop},
      );
      this.getElement().scrollTop = this._data.scroll;
      this._callback.addClick(PopupComponent.dataToParam(this._data));
    }
  }

  setAddClickHandler(callback) {
    this._callback.addClick = callback;
    this.getElement().querySelector('.film-details__comments-wrap').addEventListener('keydown', this._getAddClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.film-details__comments-wrap').addEventListener('click', this._getDeleteClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._historyClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setCloseClickHandler(callback) {
    this._callback.closePopupFilm = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._getClosePopupHandler);
  }
}
