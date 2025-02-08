import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchAnalyses() {
  const { data, error } = await supabase.from("analyses").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching analyses:", error)
    return []
  }

  return data
}

export async function saveAnalysis(filename: string, result: string) {
  const { data, error } = await supabase.from("analyses").insert({ filename, result })

  if (error) {
    console.error("Error saving analysis:", error)
    return null
  }

  return data
}

