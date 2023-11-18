function showThanks(form) {
  const formHolder = form.closest(`[data-form]`);
  if (formHolder) {
    const formBody = formHolder.querySelector("[data-form-body]");
    const formThanks = formHolder.querySelector("[data-form-thanks]");
    fadeOut({
      el: formBody,
      timeout: 0,
    });
    fadeIn({
      el: formThanks,
      display: "flex",
    });
  }
}