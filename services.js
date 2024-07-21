import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient('https://jqfeuqarvvixvljrzfph.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmV1cWFydnZpeHZsanJ6ZnBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExNDQwNDksImV4cCI6MjAzNjcyMDA0OX0._Hl9NPMCQPX8tUwLoCD8UewQeKt-EbuVAgImNkMygfM')



const getAllCats = async () => {

    let { data, error } = await supabase
        .rpc('get_categories_with_items')

    if (error) return error
    return data
}

const login = async () => {
    console.log(supabase);

    const res = await supabase.auth.signInWithPassword({
        email: 'parsa.sbg@gmail.com',
        password: '95157753',
      })

      console.log(res);

      console.log(supabase);
}

const getMe = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user);
}

const addAdmin = async () => {
    const res = await supabase.auth.admin.createUser({
        email: 'parsa.sbg@gmail.com',
        password: '95157753',
        user_metadata: { name: 'Yoda' }
      })

      console.log(res);
}


export {
    getAllCats,
    login,
    getMe,
    addAdmin
}

