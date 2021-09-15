// Секция списка фильмов.

// Импорты.

import AbstractView from './abstraction.js';

//  Создание шаблона.

function createFilmsSectionTemplate() {
  return ('<section class="films"></section>');
}

//  Создание класса.

export default class FilmsSectionComponent extends AbstractView {
  getTemplate() {
    return createFilmsSectionTemplate();
  }
}
