// Точка входа.

// Импорты.

import ProfileTemplateView from './view/profile.js';
import NavigationTemplateView from './view/navigation.js';
import SortTemplateView from './view/sort.js';
import FilmListTemplateView from './view/films.js';
import FilmCardTemplateView from './view/film-card.js';
import FilmListExtraTemplateView from './view/films-extra.js';
import ShowMoreTemplateView from './view/show-more-button.js';
import StatTemplateView from './view/stat.js';
import PopupTemplateView from './view/popup.js';
import NoFilmsTemplateView from './view/no-films.js';
import {filmData} from './mock/film-data.js';

// Магические числа.

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;
const FILMS_COUNT_STEP = 5;

// Переменные разметки.

const header = document.querySelector('.header');
const main = document.querySelector('.main');
//const footer = document.querySelector('.footer');

// Отрисовка элементов.

header.appendChild(new ProfileTemplateView().getElement());
main.appendChild(new SortTemplateView().getElement());

// Навигация.

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
main.appendChild(new NavigationTemplateView(filters).getElement());

// Окно попап(открытие, закрытие, клавиша ESC). Переписал обработчик.

function renderFilmCard(container, data) {
  const filmComponent = new FilmCardTemplateView(data);
  const popupComponent = new PopupTemplateView(data);

  function openPopup() {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
    document.querySelector('body').after(popupComponent.getElement());
  }

  function closePopup() {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
  }

  filmComponent.setOpenClickHandler(() => openPopup());
  popupComponent.setCloseClickHandler(() => closePopup());
  container.appendChild(filmComponent.getElement());
}

// Карточки фильфов и раздел экстра.

function renderFilmsList(listContainer, data) {
  listContainer.appendChild(new FilmListTemplateView().getElement());
  const films = document.querySelector('.films');
  const filmsList = document.querySelector('.films-list');
  const filmsListContainer = document.querySelector('.films-list__container');

  if (data.length === 0) {
    filmsList.appendChild(new NoFilmsTemplateView().getElement());
    return;
  }

  for (let i = 0; i < Math.min(data.length, FILMS_COUNT); i++) {
    renderFilmCard(filmsListContainer, data[i]);
  }

  const titleExtra = [{ title: 'Top rated' }, { title: 'Most commented' }];
  const [ratedFilmsListContainer, mostCommentsFilmListContainer] = Array(EXTRA_FILMS_COUNT)
    .fill(null)
    .map((_, index) => new FilmListExtraTemplateView(titleExtra[index]).getElement());
  films.append(ratedFilmsListContainer, mostCommentsFilmListContainer);

  const ratedFilms = data
    .sort((a, b) => (b.filmInfo.totalRating > a.filmInfo.totalRating) ? 1 : -1)
    .slice(0, EXTRA_FILMS_COUNT);
  ratedFilms.forEach((card) => {
    renderFilmCard(ratedFilmsListContainer, card);
  });

  const mostComments = data
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, EXTRA_FILMS_COUNT);
  mostComments.forEach((card) => {
    renderFilmCard(mostCommentsFilmListContainer, card);
  });

  if (data.length > FILMS_COUNT_STEP) {
    let renderCount = FILMS_COUNT_STEP;
    filmsList.appendChild(new ShowMoreTemplateView().getElement());
    const showMoreButton = document.querySelector('.films-list__show-more');
    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      data.slice(renderCount, renderCount + FILMS_COUNT_STEP)
        .forEach((card) => {
          renderFilmCard(filmsListContainer, card);
        });
      renderCount += FILMS_COUNT_STEP;

      if (renderCount >= filmData.length) {
        showMoreButton.remove();
      }
    });
  }
}

renderFilmsList(main, filmData);

// Статистика сайта.

const footerStat = document.querySelector('.footer__statistics');
footerStat.appendChild(new StatTemplateView(filmData).getElement());
