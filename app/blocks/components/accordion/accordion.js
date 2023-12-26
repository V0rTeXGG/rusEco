let accordions = document.querySelectorAll("[data-accordion]");
accordions.forEach((element) => {
  let accordionTable = new Accordion(element, {
    setOn: 991,
  });
});

