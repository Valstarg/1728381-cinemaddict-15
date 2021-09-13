// Кнопка "Show more".

// Импорты.

import {createTemplate} from '../utils/util.js';

// Отрисовка кнопки.

function createShowMoreTemplate() {
  return ('<button class="films-list__show-more">Show more</button>');
}

// Создание класса.

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreTemplate();
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
