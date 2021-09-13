// Список фильмов.

// Импорты.

import AbstractionView from './abstraction.js';

// Отрисовка списка.

function createFilmListTemplate() {
  return (`<section class="films">
             <section class="films-list">
               <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
               <div class="films-list__container"></div>
             </section>
           </section>`);
}

// Создание класса. Абстракция и наследование.

export default class FilmListTemplate extends AbstractionView {
  getTemplate() {
    return createFilmListTemplate();
  }
}
