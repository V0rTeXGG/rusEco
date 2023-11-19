const sliderProjects = new Swiper('[data-swipper="partner"]', {
  slidesPerView: 6,
  spaceBetween: 30,
  watchOverflow: true,
  watchSlidesProgress: true,
  pagination: {
    el: '[data-swiper="partner-pagination"]',
    type: "progressbar",
  },
  breakpoints: {
    991: {
      slidesPerView: 6,
    },
    768: {
      slidesPerView: 4,
    },
    550: {
      slidesPerView: 3,
    },
    0: {
      slidesPerView: 2,
      spaceBetween: 20,
    }
  }
});
