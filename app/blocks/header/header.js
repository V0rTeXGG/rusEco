// перед использованием добавить в структуру перед шапкой элемент ref-header
// const headerEl = document.querySelector('.header');
// const ref = document.querySelector('.ref-header');

// const toggleHeaderClassOnScroll = (props) => {
//   const {
//     ref,
//     element,
//     options = {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0
//     }
//   } = props;

//   const callback = ([entry]) => {
//     element.classList.toggle('fixed', !entry.isIntersecting);
//   };

//   const observer = new IntersectionObserver(callback, options);

//   observer.observe(ref);
// };

// toggleHeaderClassOnScroll({
//   ref: ref,
//   element: headerEl,
// });
