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

// Функция выбора класса элемента в разметке.

export const getCardClass = (variable) => variable ? 'film-card__controls-item film-card__controls-item--active' : 'film-card__controls-item';
export const getPopupClass = (variable) => variable ? 'film-details__control-button film-details__control-button--active' : 'film-details__control-button';

// Функция обрезки текста.

export function getSliceText(text) {
  let someText = text.slice(0, TEXT_MAX);
  if (text.length > someText.length) {
    someText += '...';
  }
  return someText;
}

// Функция создания шаблона.

export function createTemplate(template) {
  const newElement = document.createElement('template');
  newElement.innerHTML = template;
  return newElement.content;
}
