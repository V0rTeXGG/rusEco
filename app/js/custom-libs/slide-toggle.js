const slideDown = (data) => {
  data.el.style.height = `${data.el.scrollHeight}px`;
  data.el.style.transition = `height ${data.timeout}ms`;
};
const slideUp = (data) => {
  data.el.style.height = "";
  data.el.style.transition = `height ${data.timeout}ms`;
};