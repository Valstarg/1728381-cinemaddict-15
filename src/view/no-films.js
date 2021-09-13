// Пустой список фильмов.

// Импорты.

import AbstractionView from './abstraction.js';

// Отрисовка списка.

function createEmptyListTemplate() {
  return ('<h2 class="films-list__title">There are no movies in our database</h2>');
}

// Создание класса. Абстракция и наследование.

export default class NoFilmsTemplate extends AbstractionView {
  getTemplate() {
    return createEmptyListTemplate();
  }
}
