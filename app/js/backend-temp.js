// функция вызова спасибки, где this - сама форма
// showThanks(this)

// функция вызова модалки, где this - значение data-modal
// modal.show(this)

// функция закрытия модалки, где this - значение data-modal
// modal.close(this)

const thanksForms = document.querySelectorAll('[data-show-thanks]');

// Вызов спасибки для форм
if (thanksForms) {
  thanksForms.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();
      showThanks(e.target);
    });
  });
}
