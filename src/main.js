// Точка входа.

// Импорты.

import ProfileView from './view/profile.js';
import NavigationView from './view/navigation.js';
import StatView from './view/stat.js';
import {filmData} from './mock/film-data.js';
import FilmsPresenter from './presenter/films-list.js';
import {render, renderPosition} from './utils/render.js';

// Переменные разметки.

const header = document.querySelector('.header');
const main = document.querySelector('.main');

// Отрисовка элементов.

render(header, new ProfileView(), renderPosition.BEFOREEND);

const mainFilters = {
  Favorites: 'favorite',
  History: 'history',
  Watchlist: 'watchlist',
};

function generateFilter(item) {
  return Object.entries(mainFilters).map(([filterName, count]) => ({
    name: filterName,
    count: item.filter((task) => task.userDetails[count]).length,
  }),
  );
}

const filters = generateFilter(filmData);
render(main, new NavigationView(filters), renderPosition.BEFOREEND);

const footerStat = document.querySelector('.footer__statistics');
render(footerStat, new StatView(filmData), renderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(main);
filmsPresenter.init(filmData);
