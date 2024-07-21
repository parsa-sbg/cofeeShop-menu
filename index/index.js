import { getAllCats , login , getMe} from "../services.js";


const data = await getAllCats()
console.log(data);

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  // loop: true,
  slidesPerView: 2,
  spaceBetween: 120 ,
  slideToClickedSlide: true,
  centeredSlides: true ,
  breakpoints: { 
    320: {
      slidesPerView: 3,
      spaceBetween: 150
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 150
    },
    640: {
      slidesPerView: 5,
      spaceBetween: 150
    }
  }

});
