// Список самых популярных фильмов.

// Импорты.

import AbstractionView from './abstraction.js';

// Отрисовка списка. Добавляем данные.

function createFilmListExtraTemplate(parameter) {
  return (`<section class="films-list films-list--extra">
             <h2 class="films-list__title">${parameter.title}</h2>
             <div class="films-list__container"></div>
           </section>`);
}

// Создание класса. Абстракция и наследование.

export default class FilmsListExtraTemplate extends AbstractionView {
  constructor(parameter) {
    super();
    this._parameter = parameter;
  }

  getTemplate() {
    return createFilmListExtraTemplate(this._parameter);
  }
}
