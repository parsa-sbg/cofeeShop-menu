import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
const supabase = createClient('https://jqfeuqarvvixvljrzfph.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZmV1cWFydnZpeHZsanJ6ZnBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExNDQwNDksImV4cCI6MjAzNjcyMDA0OX0._Hl9NPMCQPX8tUwLoCD8UewQeKt-EbuVAgImNkMygfM')
console.log('test');





const getAllCats = async () => {

    let { data, error } = await supabase
        .rpc('get_categories_with_items')

    if (error) return error
    return data
}


export {
    getAllCats
}
