const formFilters = document.querySelectorAll("[data-form-filters]")

if(formFilters) {
  formFilters.forEach(form => {
    form.addEventListener('click', (e) => {
      let btnOpen = e.target.closest(".form-filters__button")
      let btnClose = e.target.closest(".form-filters__form-close")
      let formFilters = form.querySelector("[data-form-filters-form]")
      if(btnOpen) {
        formFilters.classList.add('active')
        disableScrolling();
      }
      if(btnClose) {
        formFilters.classList.remove('active')
        enableScrolling();
      }
    })
  })
}
