<template lang="html">
  <div>
    <div
      class="map"
      id="map"
      @mousedown="down"
      @mouseup="up"
      @touchstart="down"
      @touchend="up"
    >
    <div class="map__help" v-if="showHelp">
      Коснитесь крты на секунду для включения или выключения перемещения карты.
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      myMap: {},
      mousedown: false,
      mouseMoved: false,
      mapDrag: false,
      clickCoord: {
        x: 0,
        y: 0,
      },
      showHelp: true,
    }
  },
  computed: {
    ...mapState('commons', [
      'navHeight',
      'footerHeight'
    ])
  },
  mounted() {
    ymaps.ready(this.initializeYandexMap)
    this.sizeMap();

    window.addEventListener('resize', this.sizeMap);
  },
  methods: {
    sizeMap() {
      const map = document.querySelector('.map');
      const windowHeight = document.querySelector('body').offsetHeight;
      map.style =`height: ${windowHeight}px; top: ${this.navHeight}px;`;
    },
    drag(e){

      if (!this.mapDrag) {
        this.mapDrag = true;
        this.myMap.behaviors.enable('drag');
        if (this.showHelp) {
          this.showHelp = false;
        }
      } else if (this.mapDrag) {
        this.mapDrag = false;
        this.myMap.behaviors.disable('drag');
      }
    },
    down(e) {
      if (e.type === 'touchstart') {
        this.clickCoord.x = e.changedTouches[0].pageX;
        this.clickCoord.y = e.changedTouches[0].pageY;
      } else {
        this.clickCoord.x = e.clientX;
        this.clickCoord.y = e.clientY;
      }
    },
    up(e) {
      if (e.type === 'touchend') {
        if (this.clickCoord.x === e.changedTouches[0].pageX && this.clickCoord.y === e.changedTouches[0].pageY) {
          this.drag();
        }
      } else {
        if (this.clickCoord.x === e.clientX && this.clickCoord.y === e.clientY) {
          this.drag();
        }
      }
    },
    move(e) {

    },
    initializeYandexMap () {
        this.myMap = new ymaps.Map("map", {
                center: [55.71,37.1],
                zoom: 10,
                behaviors: [],
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search'
            });
        this.myMap.options.set('scrollZoomSpeed', 1);
        var HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='map__hint'>" +
                "<b>{{ properties.object }}</b><br />" +
                "{{ properties.address }}" +
                "</div>", {
                    getShape: function () {
                        var el = this.getElement(),
                            result = null;
                        if (el) {
                            var firstChild = el.firstChild;
                            result = new ymaps.shape.Rectangle(
                                new ymaps.geometry.pixel.Rectangle([
                                    [0, 0],
                                    [firstChild.offsetWidth, firstChild.offsetHeight]
                                ])
                            );
                        }
                        return result;
                    }
                }
            );
        var myPlacemarkKoz = new ymaps.Placemark([55.73520716361279,36.92067656714246], {
            address: "село Козино, Одинцовский городской округ, Московская область. 55.735158, 36.922594",
            object: "Дорога около села Козино",

            balloonContentHeader:'<span class="description">Поле в селе Грязь</span>',
            balloonContentBody: '<h4 class="balloon__nav">Построить маршрут</h4>' +
                '<a class="balloon__nav-link" target="_blank" href = "yandexnavi://build_route_on_map?lat_to=55.735158&lon_to=36.922594">Яндекс навиатор</a><br>' +
                '<a class="balloon__nav-link" target="_blank" href = "yandexmaps://maps.yandex.ru/?rtext=~55.735158,36.922594&rtt=auto">Яндекс карты</a><br>' +
                '<a class="balloon__nav-link" target="_blank" href = "https://www.google.com/maps/dir/?api=1&destination=55.735158,36.922594&travelmode=driving">Google навигатор</a><br>' +
                '<img class="balloon__nav-img" src="images/map/kozino.png" alt="поле в селе Козино"> <br/> ',
            balloonContentFooter: '',
            hintContent: 'село Козино'
        }, {
            hintLayout: HintLayout,
            iconLayout: 'default#image',
            iconImageHref: 'images/favicon.svg',
            iconImageSize: [50, 50],
            iconImageOffset: [0, 0]
        });

        var myPlacemarkVlas = new ymaps.Placemark([55.69025410393697,37.21745494801331], {
            address: "Поселок Власиха, Московская область. 55.692834, 37.216219",
            object: "Между посёлком Власиха и Лайковским кладбищем",

            balloonContentHeader:'<span class="description">Поле около посёлка Власиха</span>',
            balloonContentBody: '<h4 class="balloon__nav">Построить маршрут</h4>' +
                '<a class="balloon__nav-link" target="_blank" href = "yandexnavi://build_route_on_map?lat_to=55.69025410393697&lon_to=37.21745494801331">Яндекс навиатор</a><br>' +
                '<a class="balloon__nav-link" target="_blank" href = "yandexmaps://maps.yandex.ru/?rtext=~55.69025410393697,37.21745494801331&rtt=auto">Яндекс карты</a><br>' +
                '<a class="balloon__nav-link" target="_blank" href = "https://www.google.com/maps/dir/?api=1&destination=55.69025410393697,37.21745494801331&travelmode=driving">Google навигатор</a><br>' +
                '<img class="balloon__nav-img" src="images/map/Vlasikha.png" alt="поле около пасёлка Власиха"> <br/> ',
            balloonContentFooter: '',
            hintContent: 'Поселок Власиха'
        }, {
            hintLayout: HintLayout,
            iconLayout: 'default#image',
            iconImageHref: 'images/favicon.svg',
            iconImageSize: [50, 50],
            iconImageOffset: [0, 0]
        });

        this.myMap.geoObjects.add(myPlacemarkKoz);
        this.myMap.geoObjects.add(myPlacemarkVlas);
    },
  },
  watch: {
    navHeight: function () {
      this.sizeMap();
    },
    footerHeight: function () {
      this.sizeMap();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.sizeMap);
  }
}

</script>

<style lang="scss">
.map__hint {
  display: inline-block;
  padding: 5px;
  position: relative;
  left: -10px;
  width: 195px;
  font-size: 16px;
  line-height: 17px;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  background-color: rgba(43, 37, 44, .8);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 5px;
}
.map__balloon {
  color: #fff;
  font-size: 16px;
  background-color: rgba(43, 37, 44, .8);
  border: 1px solid rgba(255, 255, 255, 0.35);
}
.balloon__nav {
  padding: 5px 0;
}
.balloon__nav-link {
  display: block;
  text-decoration: none;
  color: $dark;
  text-align: center;
  padding: 5px;
  margin: 0 5px 5px 5px;
  box-shadow: 0 0 7px 3px rgba(0, 0, 0, .3);
  border-radius: 5px;
}
.balloon__nav-img {
  width: 100%;
  max-width: 200px;
}
</style>

<style lang="scss" scoped>

.map {
  width: 100%;
  position: relative;
}
.map__help {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100px;
  background-color: rgba(0, 0, 0, .8);
  color: $yellow;
  font-size: 22px;
  z-index: 100;
}

</style>
