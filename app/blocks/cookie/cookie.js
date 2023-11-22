document.addEventListener("DOMContentLoaded", function () {
  let cookieEl = document.querySelector("[data-cookie]");
  let cookiePeriod = cookieEl.getAttribute("data-days");

  let cookieItem = new Cookie(cookieEl, {
    name: "agreement",
    period: cookiePeriod,
  });
});
