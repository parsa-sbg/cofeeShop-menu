import { login } from "../services.js"

const loginBtn = document.querySelector('.login-form__login-btn')

const userNameInput = document.querySelector('.login-form__username')
const passwordInput = document.querySelector('.login-form__password')
const modal = document.querySelector('.modal-box')
const modalTitle = document.querySelector('.modal__title')
const modalBtn = document.querySelector('.modal__btn')


const showModal = (title, btnText, callBack) => {



    modalTitle.innerHTML = title
    modalBtn.innerHTML = btnText
    
    modalBtn.addEventListener('click', callBack)

    modal.classList.add('modal-box--show')

}


loginBtn.addEventListener('click', async () => {
    const userName = userNameInput.value
    const password = passwordInput.value


    const res = await login(userName, password)

    console.log(res);
    if (res.data.user) {
        console.log('yes');
        showModal('با موفقیت وارد شدید', 'ورود به پنل', () => {location.href = '/panel'})
    }else{
        console.log('no');
        showModal('ایمیل یا رمز عبور درست نیست', 'تلاش مجدد', () => {modal.classList.remove('modal-box--show')})
    }


})