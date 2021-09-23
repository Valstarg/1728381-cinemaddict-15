// Точка входа.

// Импорты.

import ProfileView from './view/profile.js';
import MoviesInsideView from './view/movies-inside.js';
import {filmData} from './mock/film-data.js';
import FilmsPresenter from './presenter/films-list.js';
import StatView from './view/stat.js';
import FiltersPresenter from './presenter/filters.js';
import FilmsModel from './model/mod-films.js';
import FiltersModel from './model/mod-filters.js';
import {render, renderPosition} from './utils/render.js';

// Переменные разметки.

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStat = document.querySelector('.footer__statistics');

// Отрисовка элементов.

const filmsModel = new FilmsModel();
filmsModel.setFilms(filmData);
const filtersModel = new FiltersModel();
render(header, new ProfileView(), renderPosition.BEFOREEND);
const filtersPresenter = new FiltersPresenter(main, filmsModel, filtersModel);
const filmsPresenter = new FilmsPresenter(main, filmsModel, filtersModel);
filtersPresenter.init();
filmsPresenter.init();
render(main, new StatView(), renderPosition.BEFOREEND);
render(footerStat, new MoviesInsideView(filmData), renderPosition.BEFOREEND);
