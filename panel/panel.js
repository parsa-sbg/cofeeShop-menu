import { getMe, logOut, login } from "../services.js"

window.addEventListener('load', async () => {
    const user = await getMe()
    console.log(user);
    if (!user) {
        location.href = '/login'
    }
})

// handle open accordions

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