const formInputs = document.querySelectorAll('[data-input]')
const formTextareas = document.querySelectorAll('[data-textarea]')
let fileInput = document.querySelectorAll('[data-fileupload]');

  formInputs.forEach((input) => {
    input.addEventListener('focus', (e) => {
      let label = input.previousElementSibling
      label.classList.add('focus')
      input.classList.add('fill')
    })
  })

  formInputs.forEach((input) => {
    input.addEventListener('blur', (e) => {
      let label = input.previousElementSibling
      if(input.value.length <= 0) {
        label.classList.remove('focus')
        input.classList.remove('fill')
      }
    })
  })

formTextareas.forEach((textarea) => {
  textarea.addEventListener('focus', (e) => {
    let label = textarea.previousElementSibling
    label.classList.add('focus')
    textarea.classList.add('fill')
  })
})

formTextareas.forEach((textarea) => {
  textarea.addEventListener('blur', (e) => {
    let label = textarea.previousElementSibling
    if(textarea.value.length <= 0) {
      label.classList.remove('focus')
      textarea.classList.remove('fill')
    }
  })
})


fileInput.forEach((element)=>{
  let nameInput, acceptedFilesInput, minFilesInput, maxFilesInput;

  if(element) {
    nameInput = element.getAttribute('data-nameinput');
    acceptedFilesInput = element.getAttribute('data-acceptedfiles');
    minFilesInput = element.getAttribute('data-minfiles');
    maxFilesInput = element.getAttribute('data-maxfiles');
  }

  let inputFiles = new loadInputFiles(element, {
    nameInput: nameInput,
    maxFiles: +maxFilesInput,
    minFiles: +minFilesInput,
    acceptedFiles: acceptedFilesInput,
  });
})

