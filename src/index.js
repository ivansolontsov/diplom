import "./pages/index.css";
import "./pages/about.css";
import "./script/script.js";
import Swiper from 'swiper';



let mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  slidesPerView: '4',
  initialSlide: '4',
  slidesOffsetBefore: 80,
  spaceBetween: 230,
  // freeMode: true,
  effect: 'coverflow',
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '" style="background-color: #1a1b22"></span>';
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  coverflowEffect: {
    rotate: 0,
    slideShadows: false,
    depth: 0
  },
});
