const formInputs = document.querySelectorAll('[data-input]')


  formInputs.forEach((input) => {
    input.addEventListener('focus', (e) => {
      let label = input.previousElementSibling
      label.classList.add('focus')
    })
  })

  formInputs.forEach((input) => {
    input.addEventListener('blur', (e) => {
      let label = input.previousElementSibling
      if(!input.value.length > 0) {
        label.classList.remove('focus')
      }
    })
  })

