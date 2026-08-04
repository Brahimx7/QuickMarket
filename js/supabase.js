
const supabaseUrl = "https://axhqxozxgenkxrglwhqu.supabase.co";
const supabaseKey = "sb_publishable_bDNZ0xO4opcqewoQQ4HaaQ_N1ivA-im";

export const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

console.log(supabase);