const supabaseUrl = "https://rvupdjkrjgglegiakqik.supabase.co";
const supabaseKey = "sb_publishable_prLHbvahML2D_2TztaA2Og_-lZ8ccTn";

export const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
window.supabaseClient = supabase;
console.log(supabase);