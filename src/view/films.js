// Список фильмов.

// Импорты.

import {createTemplate} from '../utils/util.js';

// Отрисовка списка.

function createFilmListTemplate() {
  return (`<section class="films">
             <section class="films-list">
               <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
               <div class="films-list__container"></div>
             </section>
           </section>`);
}

// Создание класса.

export default class FilmList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListTemplate();
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
