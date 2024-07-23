import { getMe, addNewCat, getAllCats, deleteCat, updateCat } from "../services.js"



const catForm = document.querySelector('.cat-form')
const catFormCancelElem = document.querySelector('.cat-form__cancel')
const catFormTitleElem = document.querySelector('.cat-form__title')
const catFormAddSubmitBtn = document.querySelector('.cat-form__add-submit-btn')
const catFormEditSubmitBtn = document.querySelector('.cat-form__edit-submit-btn')
const catFormNameInput = document.querySelector('.cat-form__name-input')
const addCatBtn = document.querySelector('.add-category-btn')
const menusWrapper = document.querySelector('.menus-wrapper')

let catId = null


const handleOpenAccordions = () => {
    const accordionHeaders = document.querySelectorAll('.accordion-box__header')
    accordionHeaders.forEach(header => {
        header.addEventListener('click', event => {

            const targetClassName = event.target.className
            let accordionBox
            switch (targetClassName) {
                case 'accordion-box__header': accordionBox = event.target.parentElement
                    break;

                case 'accordion-box__header-title': accordionBox = event.target.parentElement.parentElement
                    break;

                case 'fa fa-angle-down accordion-box__header-icon': accordionBox = event.target.parentElement.parentElement.parentElement
                    break;

                case 'accordion-box__header-btns': accordionBox = event.target.parentElement.parentElement
                    break;

                default:
                    break;
            }




            if (accordionBox) {
                let panel = accordionBox.querySelector('.accordion-box__panel')
                const angle = accordionBox.querySelector('.accordion-box__header-icon')

                // close open panels
                const openAccordionsLenght = document.querySelectorAll('.accordion-box__panel--open').length
                console.log(openAccordionsLenght);

                if (openAccordionsLenght == 1 && !panel.classList.contains('accordion-box__panel--open')) {
                    document.querySelector('.accordion-box__panel--open').classList.remove('accordion-box__panel--open')
                }


                // open / close accordion
                panel.classList.toggle('accordion-box__panel--open')

                // rotate angle
                angle.classList.toggle('accordion-box__header-icon--rotate')
            }

        })
    })
}

const closeCatModal = () => {
    catForm.classList.remove('cat-form--show')
    catFormNameInput.value = null
}

const getAndShowAllCatsAndItems = async () => {
    menusWrapper.innerHTML = ''
    const allCats = await getAllCats()
    allCats.forEach(cat => {
        console.log(cat);
        menusWrapper.insertAdjacentHTML('beforeend', `
                <div class="accordion-box">
                    <div class="accordion-box__header">
                        <span class="accordion-box__header-title">${cat.category_name}</span>
                        <div class="accordion-box__header-btns">
                            <button class="accordion-box__header-addbtn"><svg x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path></svg></button>
                            <button onclick="showCatModal('edit', '${cat.category_id}','${cat.category_name}' )" class="accordion-box__header-editbtn"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"><path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path></svg></button>
                            <button onclick="removeCat('${cat.category_id}')" class="accordion-box__header-delbtn"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"><path d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z"></path></svg></button>
                            <i class="fa fa-angle-down accordion-box__header-icon"></i>
                        </div>
                    </div>
                    <div class="accordion-box__panel">

                        <div class="row">
                            ${cat.items ? cat.items.map(item => `
                                    <div class="col-12 col-lg-6">
                                        <div class="accordion-box__item">
                
                                            <div class="accordion-box__item-top">

                                                <div class="accordion-box__image-wrapper">
                                                    <img class="accordion-box__image"
                                                        src=${item.image_url}
                                                        alt="image">
                                                </div>
                                                <div class="accordion-box__content">
                                                    <h4 class="accordion-box__title">${item.name}</h4>
                                                    <p class="accordion-box__desc">${item.description}</p>
                                                    <span class="accordion-box__price">${item.price} هزار تومن</span>
                                                </div>

                                            </div>
                
                                            <div class="accordion-box__item-bottom">
                                                <button class="accordion-box__item-delbtn"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"><path d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z"></path></svg></button>
                                                <button class="accordion-box__item-editbtn"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"><path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path></svg></button>
                                            </div>
                
                                        </div>
                                    </div>
                                
                                `).join('')

                : '<div class="alert alert-danger" >هیج آیتمی اضافه نشده</div>'}
                                    </div>
                                    

                                </div>
                            </div>

        `)
    })
    handleOpenAccordions()

}

const showCatModal = (action, categoryId, catName) => {

    catId = categoryId


    catFormCancelElem.addEventListener('click', () => closeCatModal())

    if (action == 'edit') {
        catFormTitleElem.innerHTML = 'ویرایش دسته بندی'
        catFormNameInput.value = catName

        catFormAddSubmitBtn.style.display = 'none'
        catFormEditSubmitBtn.style.display = 'block'


    } else {
        catFormTitleElem.innerHTML = 'افزودن دسته بندی'
        catFormEditSubmitBtn.style.display = 'none'
        catFormAddSubmitBtn.style.display = 'block'
    }

    catForm.classList.add('cat-form--show')
}

const removeCat = async (catId) => {
    console.log(catId);
    const res = await deleteCat(catId)
    console.log(res);
    if (res.status == 204) {
        alert('دسته بندی مورد نظر حذف شد')
        getAndShowAllCatsAndItems()
    }
}


///////////////////////////////////////////// events /////////////////////////////////////////////


// add and edit category btns

catFormAddSubmitBtn.addEventListener('click', async e => {
    e.preventDefault()

    if (catFormNameInput.value.trim()) {
        const res = await addNewCat(catFormNameInput.value.trim())
        if (res.status == 201) {
            alert('دسته بندی شما با موفقیت ایجاد شد.')
            closeCatModal()
            getAndShowAllCatsAndItems()
        }

    }

})

catFormEditSubmitBtn.addEventListener('click', async e => {
    e.preventDefault()

    if (catFormNameInput.value.trim()) {
        const res = await updateCat(catId, catFormNameInput.value.trim())
        if (res.status == 200) {
            alert('دسته بندی با موفقیت آپدیت شد.')
            closeCatModal()
            getAndShowAllCatsAndItems()
        }
    }
})



// add category logic
addCatBtn.addEventListener('click', () => {
    showCatModal('create')
})


window.removeCat = removeCat
window.showCatModal = showCatModal

window.addEventListener('load', async () => {
    const user = await getMe()
    console.log(user);
    if (!user) {
        location.href = '/login'
    }

    getAndShowAllCatsAndItems()
})
