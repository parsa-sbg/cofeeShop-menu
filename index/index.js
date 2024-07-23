import { getAllCats, login, getMe } from "../services.js";

const menusContainer = document.querySelector('.menus .container')


const getAndShowAllMenus = async () => {
  const menus = await getAllCats()
  console.log(menus);

  menus.forEach(menu => {
    console.log(menu);
    menusContainer.insertAdjacentHTML('beforeend', `
            <div class="menu">
                <div class="menu__title-wrapper">
                    <h2 class="menu__title">${menu.category_name}</h2>
                </div>

                <div class="menu__items">
                    <div class="row">
                    

                        ${menu.items ? menu.items.map(item => 
                          
                          `
                            <div class="col-12 col-lg-6">
                                <div class="menu__item">
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
  })
}


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


window.addEventListener('load', () => {
  getAndShowAllMenus()
})
