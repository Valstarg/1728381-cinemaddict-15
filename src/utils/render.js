// Функции отрисовки.

// Импорты.

import AbstractView from '../view/abstraction.js';

// Переменные.

export const renderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

// Функции.

export function render(container, child, place) {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case renderPosition.BEFOREEND:
      container.append(child);
      break;
  }
}

// Функция создания шаблона.

export function createTemplate(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
}

// Функция удаления компонентов.

export function remove(component) {
  if (component === null) {
    return;
  }
  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }
  component.getElement().remove();
  component.removeElement();
}

// Функция замещения элементов.

export function replace(newChild, oldChild) {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;
  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can not replace unexisting elements');
  }
  parent.replaceChild(newChild, oldChild);
}
