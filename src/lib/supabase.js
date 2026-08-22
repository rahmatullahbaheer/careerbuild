import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ymezdmtiuotiruvisagy.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_xtg8m9C2upGdYzRuHrnnxQ_Kla6O1Xp";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
