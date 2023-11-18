const sliderProjects = new Swiper('[data-swipper="partner"]', {
  slidesPerView: 6,
  spaceBetween: 30,
  watchOverflow: true,
  watchSlidesProgress: true,
  pagination: {
    el: '[data-swiper="partner-pagination"]',
    type: "progressbar",
  },
});
