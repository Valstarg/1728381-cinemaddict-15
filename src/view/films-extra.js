// Список самых популярных фильмов.

// Импорты.

import {createTemplate} from '../utils/util.js';

// Отрисовка списка. Добавляем данные.

function createFilmListExtraTemplate(parameter) {
  return (`<section class="films-list films-list--extra">
             <h2 class="films-list__title">${parameter.title}</h2>
             <div class="films-list__container"></div>
           </section>`);
}

//Создание класса.

export default class filmsListExtra {
  constructor(parameter) {
    this._parameter = parameter;
    this._element = null;
  }

  getTemplate() {
    return createFilmListExtraTemplate(this._parameter);
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
