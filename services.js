import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient('https://jqfeuqarvvixvljrzfph.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmV1cWFydnZpeHZsanJ6ZnBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExNDQwNDksImV4cCI6MjAzNjcyMDA0OX0._Hl9NPMCQPX8tUwLoCD8UewQeKt-EbuVAgImNkMygfM')



const getAllCats = async () => {

    let { data, error } = await supabase
        .rpc('get_categories_with_items')

    if (error) return error
    return data
}

const addNewCat = async (newCatName) => {

    const res = await supabase
        .from('categories')
        .insert([
            { name: newCatName },
        ])
        .select()

    return res
}

const deleteCat = async (catId) => {

    const res = await supabase
        .from('categories')
        .delete()
        .eq('id', catId)

    return res

}

const updateCat = async (catId, newCatName) => {

    const res = await supabase
        .from('categories')
        .update({ name: newCatName })
        .eq('id', catId)
        .select()

        return res

}


const login = async (userName, password) => {

    const res = await supabase.auth.signInWithPassword({
        email: userName,
        password: password,
    })

    return res
}


const logOut = async () => {
    const res = await supabase.auth.signOut()
    console.log(res);
}

const getMe = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    return user
}


export {
    getAllCats,
    login,
    getMe,
    logOut,
    addNewCat,
    deleteCat,
    updateCat
}

