// Статистика сайта.

// Импорты.

import {createTemplate} from '../utils/util.js';

// Отрисовка статистики. Добавляем данные.

function createStatTemplate(parameter) {
  return (`<p>${parameter.length} movies inside</p>`);
}

// Создание класса.

export default class Stat {
  constructor(parameter) {
    this._parameter = parameter;
    this._element = null;
  }

  getTemplate() {
    return createStatTemplate(this._parameter);
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
