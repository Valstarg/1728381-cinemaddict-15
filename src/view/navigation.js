// Навигация по сайту.
// Добавляем данные.

export function createNavigationTemplate(parameter) {
  const watch = [];
  const favorites = [];
  const history = [];
  parameter.forEach((object) => {
    if (object.userDetails.watchlist) {
      watch.push(object.userDetails.watchlist);
    }
    if (object.userDetails.favorite) {
      favorites.push(object.userDetails.favorite);
    }
    if (object.userDetails.alreadyWatched) {
      history.push(object.userDetails.alreadyWatched);
    }
  });
  return `<nav class="main-navigation">
             <div class="main-navigation__items">
               <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
               <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watch.length}</span></a>
               <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history.length}</span></a>
               <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites.length}</span></a>
             </div>
             <a href="#stats" class="main-navigation__additional">Stats</a>
           </nav>`;
}
