import { createClient } from "@supabase/supabase-js";

const SupabaseService = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default SupabaseService;
