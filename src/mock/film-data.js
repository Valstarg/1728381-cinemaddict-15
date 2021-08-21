// Информация по фильму.

// Импорты.

import * as dayjs from 'dayjs';
import {getRandomNumber} from '../utils/util.js';

// Магические числа.

const FILMS_COUNT = 18;

// Функции получения отдельных элементов информации о фильме.

// Комментарии к фильму.

// Текст комментария.

function getCommentText() {
  return {
    0: 'Don`t waste your time! I assure you!',
    1: 'In principle, the film is so-so, with nothing to do, you can take a look once and forget',
    2: 'I recommend a good movie to everyone',
    3: 'There was no sharpness of the plot, although at first I was interested',
    4: 'A very boring film, raw, without meaning, with a pathetic hint of humor, but I don`t want to laugh. It looks like a student was filming some kind of experiment. Wasted time',
    5: 'A good movie is a fairy tale)) thank you for posting this movie on the website)',
    6: 'It`s a good movie. The best I`ve seen in the past two weeks',
    7: 'It`s definitely not a comedy. But it`s quite a watchable movie.',
    8: 'A beautiful movie, worth watching',
    9: 'Very very bad (((',
  }[getRandomNumber(0, 9)];
}

// Имя автора.

function getAuthorName() {
  return {
    0: 'John Crooth',
    1: 'Frank Silackovich',
    2: 'Eleanor Smith',
    3: 'James Todesku',
    4: 'Carole Potter',
    5: 'Charles Mcfly',
    6: 'Gary Goodman',
    7: 'Eric Vanduke',
    8: 'Sara Conor',
    9: 'Nancy Dru',
  }[getRandomNumber(0, 9)];
}

// Смайлы.

function getEmoji() {
  return {
    0: 'angry.png',
    1: 'puke.png',
    2: 'sleeping.png',
    3: 'smile.png',
  }[getRandomNumber(0, 3)];
}

// Дата.

function getCommentDate() {
  const dayGap = getRandomNumber(-1095, 0);
  return dayjs().add(dayGap, 'day').toDate();
}

// Генерация комментария.

function generateComment() {
  return {
    text: getCommentText(),
    authorName: getAuthorName(),
    emoji: getEmoji(),
    date: getCommentDate(),
  };
}

// Остальные данные.
// ID

function getId() {
  const random = Math.random();
  return random.toString(20).substr(2);
}

// Названия.

function getTitle() {
  return {
    0: 'Made for Each Other',
    1: 'Popeye the Sailor meets Sindbad the Sailor',
    2: 'Sugebrush trail',
    3: 'Santa Claus conquers the Martians',
    4: 'The dance of live',
  }[getRandomNumber(0, 4)];
}

// Постер.

function getPoster() {
  return {
    0: 'made-for-each-other.png',
    1: 'popeye-meets-sinbad.png',
    2: 'sagebrush-trail.jpg',
    3: 'santa-claus-conquers-the-martians.jpg',
    4: 'the-dance-of-life.jpg',
    5: 'the-great-flamarion.jpg',
    6: 'the-man-with-the-golden-arm.jpg',
  }[getRandomNumber(0, 6)];
}

// Возрастное ограничение.

function getAgeRating() {
  return {
    0: '0+',
    1: '6+',
    2: '12+',
    3: '16+',
    4: '18+',
  }[getRandomNumber(0, 4)];
}

// Режисёр.

function getDirectors() {
  return {
    0: 'John Cromwell',
    1: 'Adolph Zukor',
    2: 'Clinton Eastwood',
    3: 'Armand Schaefer',
    4: 'A.Edward Sutherland',
  }[getRandomNumber(0, 4)];
}

// Сценарист.

function getWriters() {
  return {
    0: ['David O.Selznick'],
    1: ['Paul Malvern'],
    2: ['Joseph E.Levine'],
    3: ['Arthur Hopkins'],
    4: ['William Wilder'],
  }[getRandomNumber(0, 4)];
}

// Актёры.

function getActors() {
  return {
    0: ['James Stuart', 'Carole Lombard', 'Charles Coburn'],
    1: ['Max Fleischer', 'John Wayne', 'Lindsley Parsons'],
    2: ['Frank Sinatra', 'Eleanor Parker', 'Kim Novak'],
    3: ['Hal Skelly', 'Nancy Carrol', 'George Manker'],
    4: ['Erich Von Stroheim', 'Beth Hughes', 'Stephen Barclay'],
  }[getRandomNumber(0, 4)];
}

// Дата выхода.

function getReleaseDate() {
  const dayGap = getRandomNumber(-35040, -16790);
  return dayjs().add(dayGap, 'day').toDate();
}

// Страна происхождения.

function getCountry() {
  return {
    0: 'Australia',
    1: 'India',
    2: 'USA',
    3: 'Canada',
    4: 'Italy',
  }[getRandomNumber(0, 4)];
}

// Жанр фильма.

function getGenres() {
  return {
    0: ['drama', 'romance', 'comedy'],
    1: ['comedy'],
    2: ['action', 'drama', 'western'],
    3: ['musical', 'drama', 'romance'],
    4: ['detective'],
  }[getRandomNumber(0, 4)];
}

// Описание.

function getDescription() {
  return {
    0: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    1: 'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    2: 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    3: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Aliquam id orci ut lectus varius viverra.',
    4: 'Fusce tristique felis at fermentum pharetra. In rutrum ac purus sit amet tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  }[getRandomNumber(0, 4)];
}

// Список просмотров.

function getWatchList() {
  const dayGap = getRandomNumber(-1095, 0);
  return dayjs().add(dayGap, 'day').toDate();
}

// Функция генерации информации по фильму.

function generateObject() {
  return {
    'id': getId(),
    'comments': new Array(getRandomNumber(10, 40)).fill().map(() => generateComment()),
    'filmInfo': {
      'title': getTitle(),
      'alternativeTitle': getTitle(),
      'totalRating': getRandomNumber(4, 9).toFixed(1),
      'poster': getPoster(),
      'ageRating': getAgeRating(),
      'director': getDirectors(),
      'writers': getWriters(),
      'actors': getActors(),
      'release': {
        'date': getReleaseDate(),
        'releaseCountry': getCountry(),
      },
      'runtime': `1h ${getRandomNumber(10, 50)}m`,
      'genres': getGenres(),
      'description': getDescription(),
    },
    'userDetails': {
      'watchlist': Boolean(getRandomNumber(0, 1)),
      'history': Boolean(getRandomNumber(0, 1)),
      'watchingDate': getWatchList(),
      'favorite': Boolean(getRandomNumber(0, 1)),
    },
  };
}

// Создание массива с данными.

export const filmData = new Array(FILMS_COUNT).fill().map(() => generateObject());
