
// Блок самых популярных фильмов.

// Импорты.

import AbstractView from './abstraction.js';

//  Создание шаблона.

export function createRatedFilmsTemplate() {
  return (`<section class="films-list films-list--extra">
             <h2 class="films-list__title">Top rated</h2>
             <div class="films-list__container"></div>
           </section>`);
}

//  Создание класса.

export default class RatedFilmsComponent extends AbstractView {
  getTemplate() {
    return createRatedFilmsTemplate();
  }
}
