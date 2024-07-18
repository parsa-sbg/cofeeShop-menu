const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    // loop: true,
    // slidesPerView: 2,
    spaceBetween: 100 ,
    slideToClickedSlide: true,
    centeredSlides: true ,
    breakpoints: { 
      320: {
        slidesPerView: 1,
        // spaceBetween: 20
      },
      480: {
        slidesPerView: 3,
        // spaceBetween: 30
      },
      640: {
        slidesPerView: 5,
        // spaceBetween: 40
      }
    }
  
  });