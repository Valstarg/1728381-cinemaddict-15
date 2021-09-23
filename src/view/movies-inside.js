// Статистика сайта.

// Импорты.

import AbstractView from './abstraction.js';

// Отрисовка статистики. Добавляем данные.

function createMoviesInsideTemplate(parameter) {
  return (`<p>${parameter.length} movies inside</p>`);
}

// Создание класса. Абстракция и наследование.

export default class MoviesInsideComponent extends AbstractView {
  constructor(parameter) {
    super();
    this._parameter = parameter;
  }

  getTemplate() {
    return createMoviesInsideTemplate(this._parameter);
  }
}
