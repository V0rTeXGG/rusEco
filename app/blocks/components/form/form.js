const phoneMasks = document.querySelectorAll('[data-custom-mask]')
let validForm = new formValidator('[data-validate-form]', {});

if(phoneMasks) {
  phoneMasks.forEach((element) => {
    let phoneMaskSimple = new customInputMask(element, {});
  });
}

