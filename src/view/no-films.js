// Пустой список фильмов.

// Импорты.

import AbstractView from './abstraction.js';

// Отрисовка списка.

function createEmptyListTemplate() {
  return ('<h2 class="films-list__title">There are no movies in our database</h2>');
}

// Создание класса.

export default class NoFilmsComponent extends AbstractView {
  getTemplate() {
    return createEmptyListTemplate();
  }
}
