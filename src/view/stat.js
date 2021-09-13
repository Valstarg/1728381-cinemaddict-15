// Статистика сайта.

// Импорты.

import AbstractionView from './abstraction.js';

// Отрисовка статистики. Добавляем данные.

function createStatTemplate(parameter) {
  return (`<p>${parameter.length} movies inside</p>`);
}

// Создание класса. Абстракция и наследование.

export default class StatTemplate extends AbstractionView {
  constructor(parameter) {
    super();
    this._parameter = parameter;
  }

  getTemplate() {
    return createStatTemplate(this._parameter);
  }
}
