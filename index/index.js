import { getAllCats, login, getMe } from "../services.js";



const menusContainer = document.querySelector('.menus .container')
const headerSwiper = document.querySelector('.swiper-wrapper')


let allSwiperSlides = null
let isScrolling = false


const getAndShowAllMenus = async () => {
  const menus = await getAllCats()

  menus.forEach(menu => {

    menusContainer.insertAdjacentHTML('beforeend', `
            <div class="menu observe-section">
                <div id="${menu.category_id}" class="menu__title-wrapper">
                    <h2 class="menu__title">${menu.category_name}</h2>
                </div>

                <div class="menu__items">
                    <div class="row">
                    

                        ${menu.items ? menu.items.map(item =>

      `
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
                          `
    ).join("")

        : '<div class="alert alert-danger" >هیج آیتمی اضافه نشده</div>'}

                    </div>

                </div>
            </div>
      `)

    // insert into heaeder
    headerSwiper.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                <a id="menuId${menu.category_id}" href="#${menu.category_id}" class="header-item">${menu.category_name}</a>
            </div>
      `)

  })
}

const addActiveClassToElemById = (id) => {
  const elem = document.querySelector(`#${id}`)

  document.querySelector('.header-item--active').classList.remove('header-item--active')
  elem.classList.add('header-item--active')
}

const getSwiperSlideIndexByInnerId = (id) => {
  const slideIndex = [...allSwiperSlides].findIndex(slide => slide.childNodes[1].id == id)
  return slideIndex
}




window.addEventListener('load', async () => {
  await getAndShowAllMenus()
  allSwiperSlides = document.querySelectorAll('.swiper-slide')

  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    // loop: true,
    slidesPerView: 2,
    spaceBetween: 120,
    slideToClickedSlide: true,
    centeredSlides: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 100
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

  // active header item after ckick and scroll to related manu

  const allHeaderItems = document.querySelectorAll('.header-item')
  allHeaderItems.forEach(item => {
    item.addEventListener('click', event => {
      isScrolling = true
      addActiveClassToElemById(event.target.id)
      setTimeout(() => {
        isScrolling = false
      }, 1000);
    })
  })




  // active related header title when menu inter

  const observerOptions = {
    root: null,
    rootMargin: '-200px',
    threshold: 0
  }

  let activeElem = null
  const observerCallback = (entries) => {
    if (!isScrolling) {
      const main = entries[0]

      if (main.isIntersecting) {
        activeElem = main.target
      }
      let activeElemID = null
      if (activeElem.className.includes('menu')) {
        const headerElem = activeElem.querySelector('.menu__title-wrapper')
        activeElemID = headerElem.id
  
      } else {
        activeElemID = 'home'
      }
  
      addActiveClassToElemById('menuId' + activeElemID)
      const slideIndex = getSwiperSlideIndexByInnerId('menuId' + activeElemID)
      swiper.slideTo(slideIndex)
    }
  };

  const allObserveSections = document.querySelectorAll('.observe-section')

  let observer = new IntersectionObserver(observerCallback, observerOptions)

  allObserveSections.forEach(oserveSection => {
    observer.observe(oserveSection)
  })
})
