// Фильмы внутри.

// Импорты.

import AbstractView from './abstraction.js';

// Отрисовка.

function createMoviesInsideTemplate(parameter) {
  return `<p>${parameter.length} movies inside</p>`;
}

// Создание класса.

export default class MoviesInsideComponent extends AbstractView {
  constructor(parameter) {
    super();
    this._parameter = parameter;
  }

  getTemplate() {
    return createMoviesInsideTemplate(this._parameter);
  }
}
