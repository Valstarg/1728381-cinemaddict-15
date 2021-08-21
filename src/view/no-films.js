// Пустой список фильмов.

// Импорты.

import {createTemplate} from '../utils/util.js';

// Отрисовка списка.

function createEmptyListTemplate() {
  return ('<h2 class="films-list__title">There are no movies in our database</h2>');
}

// Coздание класса.

export default class noFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEmptyListTemplate();
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
