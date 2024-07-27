import { getAllCats } from "../services.js"; // Only importing necessary functions

const menusContainer = document.querySelector('.menus .container');
const headerSwiper = document.querySelector('.swiper-wrapper');

let allSwiperSlides = null;
let isScrolling = false;

const createMenuHTML = (menu) => `
  <div class="menu observe-section">
    <div id="${menu.category_id}" class="menu__title-wrapper">
      <h2 class="menu__title">${menu.category_name}</h2>
    </div>
    <div class="menu__items">
      <div class="row">
        ${menu.items ? menu.items.map(createMenuItemHTML).join('') : '<div class="alert alert-danger">هیج آیتمی اضافه نشده</div>'}
      </div>
    </div>
  </div>
`;

const createMenuItemHTML = (item) => `
  <div class="col-12 col-lg-6">
    <div data-aos="fade-left" data-aos-once="true" class="menu__item">
      <div class="menu__item-image-wrapper">
        <img class="menu__item-image" src=${item.image_url} alt="image">
      </div>
      <div class="menu__item-content">
        <h4 class="menu__item-title">${item.name}</h4>
        <p class="menu__item-desc">${item.description}</p>
        <span class="menu__item-price">${item.price} هزار تومن</span>
      </div>
    </div>
  </div>
`;

// Function to create header swiper item HTML
const createHeaderSwiperHTML = (menu) => `
  <div class="swiper-slide">
    <a id="menuId${menu.category_id}" href="#${menu.category_id}" class="header-item">${menu.category_name}</a>
  </div>
`;

const getAndShowAllMenus = async () => {
  const menus = await getAllCats();

  menus.forEach(menu => {
    menusContainer.insertAdjacentHTML('beforeend', createMenuHTML(menu));
    headerSwiper.insertAdjacentHTML('beforeend', createHeaderSwiperHTML(menu));
  });
};

const addActiveClassToElemById = (id) => {
  const elem = document.querySelector(`#${id}`);
  document.querySelector('.header-item--active').classList.remove('header-item--active');
  elem.classList.add('header-item--active');
};

// Get swiper slide index by inner element ID
const getSwiperSlideIndexByInnerId = (id) => {
  return [...allSwiperSlides].findIndex(slide => slide.childNodes[1].id === id);
};

window.addEventListener('load', async () => {
  await getAndShowAllMenus();
  allSwiperSlides = document.querySelectorAll('.swiper-slide');

  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 2,
    spaceBetween: 120,
    slideToClickedSlide: true,
    centeredSlides: true,
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 100 },
      480: { slidesPerView: 3, spaceBetween: 150 },
      640: { slidesPerView: 5, spaceBetween: 150 }
    }
  });

  // Event delegation for header items
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('header-item')) {
      isScrolling = true;
      addActiveClassToElemById(event.target.id);
      setTimeout(() => { isScrolling = false; }, 1000);
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '-200px',
    threshold: 0
  };

  const observerCallback = (entries) => {
    if (!isScrolling) {
      const main = entries[0];
      if (main.isIntersecting) {
        const activeElem = main.target;
        const activeElemID = activeElem.className.includes('menu')
          ? activeElem.querySelector('.menu__title-wrapper').id
          : 'home';
        addActiveClassToElemById('menuId' + activeElemID);
        swiper.slideTo(getSwiperSlideIndexByInnerId('menuId' + activeElemID));
      }
    }
  };

  const allObserveSections = document.querySelectorAll('.observe-section');
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all sections
  allObserveSections.forEach(section => observer.observe(section));
});
