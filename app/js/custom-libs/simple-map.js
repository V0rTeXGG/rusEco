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
      iconImageSize: [80, 80],
      iconImageOffset: [-21, -50],
    }
  );
  myMap.geoObjects.add(myPlacemark);
}

const layer = new YMapDefaultSchemeLayer({
  customization: [
    // Делаем прозрачными все геометрии водных объектов.
    {
      tags: {
        all: ['water']
      },
      elements: 'geometry',
      stylers: [
        {
          opacity: 0
        }
      ]
    },
    // Меняем цвет подписей для всех POI и узлов сети общественного транспорта.
    {
      tags: {
        any: ['poi', 'transit_location']
      },
      elements: 'label.text.fill',
      stylers: [
        {
          color: '#0000DD'
        }
      ]
    }
  ]
});
map.addChild(layer);

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
