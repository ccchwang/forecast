import Siema from 'siema';

export default class Carousel {
  constructor(el) {
    // set up new carousel
    let Carousel = new Siema({
      duration: 250,
      loop: true
    });

    // play on autoloop
    let autoloop = setInterval(() => Carousel.next(), 1700);

    // add click handlers to buttons
    el.querySelector('.carousel-prev')
      .addEventListener('click', () => {
        clearInterval(autoloop);
        Carousel.prev();
      });
    el.querySelector('.carousel-next')
      .addEventListener('click', () => {
        clearInterval(autoloop);
        Carousel.next();
      });
  }
}
