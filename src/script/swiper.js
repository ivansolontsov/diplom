import Swiper from 'swiper';

let mySwiper = new Swiper ('.swiper-container', {
  direction: 'horizontal',
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '" style="background-color: #1a1b22"></span>';
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
      simulateTouch: true,
      slidesOffsetBefore: 16,
      width: 239,
      spaceBetween: 500
    },
    426: {
      slidesPerView: 2,
      spaceBetween: 336,
      width: 356,
      simulateTouch: true,
      slidesOffsetBefore: 40,
    },
    1331: {
      slidesPerView: '3',
      spaceBetween: 50,
      slidesOffsetBefore: 120,
      width: 1200,
      simulateTouch: false,
    }
  }
});


export {mySwiper};
