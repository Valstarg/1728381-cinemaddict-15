// Импорты.

import {createProfileTemplate} from './view/profile.js';
import {createNavigationTemplate} from './view/navigation.js';
import {createSortTemplate} from './view/sort.js';
import {createFilmListTemplate} from './view/films.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createFilmListExtraTemplate} from './view/films-extra.js';
import {createShowMoreTemplate} from './view/show-more-button.js';
import {createStatTemplate} from './view/stat.js';

// Магические числа.

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

// Функция отрисовки элементов.

function render(container, template, place) {
  return container.insertAdjacentHTML(place, template);
}

// Переменные разметки и отрисовка элементов.

const header = document.querySelector('.header');
const main = document.querySelector('.main');
render(header, createProfileTemplate(), 'beforeend');
render(main, createNavigationTemplate(), 'afterbegin');
render(main, createSortTemplate(), 'beforeend');
render(main, createFilmListTemplate(), 'beforeend');

const filmsListContainer = document.querySelector('.films-list__container');
for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate(), 'beforeend');
}

const filmsList = document.querySelector('.films-list');
render(filmsList, createShowMoreTemplate(), 'beforeend');

const films = document.querySelector('.films');
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(films, createFilmListExtraTemplate(), 'beforeend');
}

const filmsListExtra = document.querySelectorAll('.films-list--extra');
filmsListExtra.forEach((item) => {
  const filmsListContainerExtra = item.querySelector('.films-list__container');
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    render(filmsListContainerExtra, createFilmCardTemplate(), 'beforeend');
  }
});

const footerStat = document.querySelector('.footer__statistics');
render(footerStat, createStatTemplate(), 'beforeend');
