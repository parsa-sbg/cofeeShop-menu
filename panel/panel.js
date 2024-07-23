import { getMe, addNewCat, getAllCats } from "../services.js"



const catForm = document.querySelector('.cat-form')
const catFormCancelElem = document.querySelector('.cat-form__cancel')
const catFormTitleElem = document.querySelector('.cat-form__title')
const catFormSubmitBtn = document.querySelector('.cat-form__submit-btn')
const catFormNameInput = document.querySelector('.cat-form__name-input')
const addCatBtn = document.querySelector('.add-category-btn')
const menusWrapper = document.querySelector('.menus-wrapper')



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

const showCatModal = (action, catId) => {


    catFormCancelElem.addEventListener('click', () => closeCatModal())

    if (action == 'edit') {
        catFormTitleElem.innerHTML = 'ویرایش دسته بندی'

    } else {
        catFormTitleElem.innerHTML = 'افزودن دسته بندی'
        catFormSubmitBtn.addEventListener('click', async e => {
            e.preventDefault()

            if (catFormNameInput.value.trim()) {
                const res = await addNewCat(catFormNameInput.value.trim())
                if (res.status == 201) {
                    alert('دسته بندی شما با موفقیت ایجاد شد.')
                    closeCatModal()
                }

            }

        })
    }

    catForm.classList.add('cat-form--show')
}

const getAndShowAllCatsAndItems = async () => {
    const allCats = await getAllCats()
    allCats.forEach(cat => {
        console.log(cat);
        menusWrapper.insertAdjacentHTML('beforeend', `
                <div class="accordion-box">
                    <div class="accordion-box__header">
                        <span class="accordion-box__header-title">${cat.category_name}</span>
                        <div class="accordion-box__header-btns">
                            <button class="accordion-box__header-delbtn">حذف</button>
                            <button class="accordion-box__header-editbtn">ویرایش</button>
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
                                                        src="https://sabooscafe.menew.ir/_next/image?url=https%3A%2F%2Fmenew.s3.ir-thr-at1.arvanstorage.ir%2F100114%2F109563%2F110205%2Fconversions%2F%D9%81%DB%8C%D9%84%D9%87-%D9%85%D8%B1%D8%BA-%DA%AF%D8%B1%DB%8C%D9%84-%D9%81%D8%A7%D9%87%DB%8C%D8%AA%D8%A7-%D8%AA%D9%86%D8%AF-normal.jpg&amp;w=128&amp;q=60"
                                                        alt="image">
                                                </div>
                                                <div class="accordion-box__content">
                                                    <h4 class="accordion-box__title">${item.name}</h4>
                                                    <p class="accordion-box__desc">${item.description}</p>
                                                    <span class="accordion-box__price">${item.price} هزار تومن</span>
                                                </div>

                                            </div>
                
                                            <div class="accordion-box__item-bottom">
                                                <button class="accordion-box__item-delbtn">حذف</button>
                                                <button class="accordion-box__item-editbtn">ویرایش</button>
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


///////////////////////////////////////////// events /////////////////////////////////////////////



// add category logic
addCatBtn.addEventListener('click', () => {
    showCatModal('create')
})



window.addEventListener('load', async () => {
    const user = await getMe()
    console.log(user);
    if (!user) {
        location.href = '/login'
    }

    getAndShowAllCatsAndItems()
    handleOpenAccordions()
})
