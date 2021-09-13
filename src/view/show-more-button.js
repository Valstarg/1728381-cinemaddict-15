// Кнопка "Show more".

// Импорты.

import AbstractionView from './abstraction.js';

// Отрисовка кнопки.

function createShowMoreTemplate() {
  return ('<button class="films-list__show-more">Show more</button>');
}

// Создание класса. Абстракция и наследование.

export default class ShowMoreTemplate extends AbstractionView {
  getTemplate() {
    return createShowMoreTemplate();
  }
}
