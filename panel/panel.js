import { getMe , logOut , login} from "../services.js"

window.addEventListener('load', async () => {
    const user = await getMe()
    console.log(user);
    if (!user) {
        location.href = '/login'
    }
})