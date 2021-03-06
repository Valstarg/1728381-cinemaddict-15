// Класс Smart.

// Импорты.

import AbstractView from './abstraction.js';

// Создание класса.

export default class SmartComponent extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, dataNew) {
    if (!update) {
      return;
    }
    this._data = { ...this._data, ...update };
    if (dataNew) {
      return;
    }
    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
