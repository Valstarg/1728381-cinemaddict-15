// Список самых популярных фильмов.
// Добавляем данные.

export function createFilmListExtraTemplate(parameter) {
  return (`<section class="films-list films-list--extra">
             <h2 class="films-list__title">${parameter.title}</h2>
             <div class="films-list__container"></div>
           </section>`);
}
