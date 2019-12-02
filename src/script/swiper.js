import Swiper from 'swiper';

let mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  slidesPerView: '3',
  spaceBetween: 50,
  // centeredSlides: true,
  slidesOffsetBefore: 120,
  width: 1200,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '" style="background-color: #1a1b22"></span>';
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


export {mySwiper};
