function enableScrolling() {
  let html = document.querySelector("html");
  let lockedEls = document.querySelectorAll("[data-lock-scroll]");

  if (html.classList.contains("disable-scrolling")) {
    setTimeout(function () {
      html.classList.remove("disable-scrolling");
      lockedEls.forEach(function (item) {
        item.style.paddingRight = "";
      });
    }, 300);
    setTimeout(function () {
      lockedEls.forEach(function (item) {
        item.style.transition = "";
      });
    }, 400);
  }
}
function disableScrolling() {
  let html = document.querySelector("html");
  let lockedEls = document.querySelectorAll("[data-lock-scroll]");
  let scrollWidth = window.innerWidth - document.body.clientWidth;

  if (!html.classList.contains("disable-scrolling")) {
    lockedEls.forEach(function (item) {
      item.style.paddingRight = `${scrollWidth}px`;
      item.style.transition = "0s";
    });
    html.classList.add("disable-scrolling");
  }
}
