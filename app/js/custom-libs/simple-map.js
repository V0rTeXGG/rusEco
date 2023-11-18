document.addEventListener("DOMContentLoaded", function () {
  let mapItems = document.querySelectorAll("[data-map]");
  mapItems.forEach((mapItem) => {
    ymaps.ready(() => {
      initSimpleMap(mapItem);
    });
    initSimpleMapOverlay(mapItem);
  });
});

function initSimpleMap(mapItem) {
  let mapCoords = mapItem.getAttribute("data-map-coords").split(",");
  let mapIcon = mapItem.getAttribute("data-map-icon");
  let mapIconCaption = mapItem.getAttribute("data-map-icon-caption");
  let mapBalloon = mapItem.getAttribute("data-map-balloon");
  let myMap = new ymaps.Map(mapItem, {
    center: mapCoords,
    zoom: 17,
    controls: [],
  });

  let myPlacemark = new ymaps.Placemark(
    mapCoords,
    {
      iconContent: mapIconCaption
        ? `<div class="map__placemark"><span>${mapIconCaption}</span></div>`
        : false,
      balloonContent: mapBalloon ? mapBalloon : false,
    },
    {
      iconLayout: mapIconCaption ? "default#imageWithContent" : "default#image",
      iconImageHref: mapIcon,
      iconImageSize: [42, 50],
      iconImageOffset: [-21, -50],
    }
  );
  myMap.geoObjects.add(myPlacemark);
}

function initSimpleMapOverlay(mapItem) {
  let mapOverlay = mapItem.closest("[data-map-overlay]");

  if (mapOverlay) {
    mapOverlay.addEventListener("mouseleave", function () {
      this.classList.add("map--no-touch");
    });

    mapOverlay.addEventListener("click", function () {
      this.classList.remove("map--no-touch");
    });
  }
}
