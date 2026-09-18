import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const supabaseUrl = "https://rvupdjkrjgglegiakqik.supabase.co";
const supabaseKey = "sb_publishable_prLHbvahML2D_2TztaA2Og_-lZ8ccTn";

const supabase = createClient(
    supabaseUrl,
    supabaseKey
);

export { supabase };