// перед использованием добавить в структуру перед шапкой элемент ref-header
const headerEl = document.querySelector('.header');
const ref = document.querySelector('.ref-header');
const burger = document.querySelector('[data-header-burger]')
const headerMenu = document.querySelector('[data-header-menu]')

const toggleHeaderClassOnScroll = (props) => {
  const {
    ref,
    element,
    options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    }
  } = props;

  const callback = ([entry]) => {
    element.classList.toggle('fixed', !entry.isIntersecting);
  };

  const observer = new IntersectionObserver(callback, options);

  observer.observe(ref);
};

toggleHeaderClassOnScroll({
  ref: ref,
  element: headerEl,
});

burger.addEventListener('click', function() {
  this.classList.toggle('active');
  headerMenu.classList.toggle('active');
  if(this.classList.contains('active')) {
    disableScrolling();
  } else {
    enableScrolling();
  }
})
