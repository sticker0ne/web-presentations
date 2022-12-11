// @ts-ignore
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import type { Database } from "../../../src/types/supabase/database-types";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey",
};

const supabaseClient = createClient<Database>(
// @ts-ignore
  Deno.env.get("SUPABASE_URL") ?? "",
// @ts-ignore
  Deno.env.get("SUPABASE_ANON_KEY") ?? "",
);

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { data, error } = await supabaseClient.from("apartments").select("*");

    let minPrice = Number.MAX_SAFE_INTEGER;
    let maxPrice = Number.MIN_SAFE_INTEGER;

    let minSquare = Number.MAX_SAFE_INTEGER;
    let maxSquare = Number.MIN_SAFE_INTEGER;

    data.forEach(item => {
      minPrice = Math.min(minPrice, item.price);
      maxPrice = Math.max(maxPrice, item.price);

      minSquare = Math.min(minSquare, item.square);
      maxSquare = Math.max(maxSquare, item.square);
    });

    return new Response(JSON.stringify({ data: { minPrice, maxPrice, minSquare, maxSquare }, error }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
