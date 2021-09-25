// Кнопка "Show more".

// Импорты.

import AbstractView from './abstraction.js';

// Отрисовка кнопки.

function createShowMoreTemplate() {
  return '<button class="films-list__show-more">Show more</button>';
}

// Создание класса.

export default class ShowMoreComponent extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._getClickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreTemplate();
  }

  _getClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
