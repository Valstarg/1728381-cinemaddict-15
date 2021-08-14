// Утилитарные функции и переменные.

// Магические числа.

const TEXT_MAX = 200;

// Функция выбора случайного числа.

export function getRandomNumber(from, before) {
  return Math.floor(Math.random() * (before - from + 1) + from);
}

// Функция выбора первого элемента массива.

export function getFirstArrayElement(array) {
  return array[0];
}

// Функция выбора класса.

export const getClass = (variable) => variable ? 'film-card__controls-item film-card__controls-item--active' : 'film-card__controls-item';

// Функция обрезки текста.

export function getSliceText(text) {
  let someText = text.slice(0, TEXT_MAX);
  if (text.length > someText.length) {
    someText += '...';
  }
  return someText;
}
