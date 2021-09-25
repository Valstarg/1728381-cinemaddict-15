// Блок самых коментируемых фильмов.

// Импорты.

import AbstractView from './abstraction.js';

// Отрисовка списка.

export function createMoreCommentedFilmsTemplate() {
  return `<section class="films-list films-list--extra">
             <h2 class="films-list__title">Most commented</h2>
             <div class="films-list__container"></div>
           </section>`;
}

// Создание класса.

export default class MoreCommentedFilmsComponent extends AbstractView {
  getTemplate() {
    return createMoreCommentedFilmsTemplate();
  }
}
