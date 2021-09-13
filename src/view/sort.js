// Сортировка фильмов.

// Импорты.

import AbstractionView from './abstraction.js';

// Отрисовка списка сортировки.

export function createSortTemplate() {
  return (`<ul class="sort">
      <li>
        <a href="#" class="sort__button">Sort by default</a>
      </li>
      <li>
        <a href="#" class="sort__button">Sort by date</a>
      </li>
      <li>
        <a href="#" class="sort__button sort__button--active">Sort by rating</a>
      </li>
    </ul>`);
}

// Создание класса. Абстракция и наследование.

export default class SortTemplate extends AbstractionView {
  getTemplate() {
    return createSortTemplate();
  }
}
