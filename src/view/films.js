// Список фильмов.

// Импорты.

import AbstractView from './abstraction.js';

// Отрисовка списка.

function createFilmListTemplate() {
  return (`<section class="films-list">
             <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
             <div class="films-list__container"></div>
           </section>`);
}

// Создание класса.

export default class FilmListComponent extends AbstractView {
  getTemplate() {
    return createFilmListTemplate();
  }
}
