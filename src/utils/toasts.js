const toastContainer = document.createElement('div');
toastContainer.classList.add('toast-container');
document.body.append(toastContainer);

export const toast = (message) => {
  const toastItem = document.createElement('div');
  toastItem.textContent = message;
  toastItem.classList.add('toast-item');

  toastContainer.append(toastItem);
};

export const removeToast = () => {
  document.querySelector('.toast-item').remove();
};
