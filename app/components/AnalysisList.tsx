"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { fetchAnalyses } from "../utils/supabaseClient"

interface Analysis {
  id: string
  created_at: string
  filename: string
}

export default function AnalysisList({ onSelectAnalysis }: { onSelectAnalysis: (analysis: Analysis) => void }) {
  const [analyses, setAnalyses] = useState<Analysis[]>([])

  useEffect(() => {
    loadAnalyses()
  }, [])

  const loadAnalyses = async () => {
    const fetchedAnalyses = await fetchAnalyses()
    setAnalyses(fetchedAnalyses)
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Your Analyses</h3>
      <ul className="space-y-2">
        {analyses.map((analysis) => (
          <li key={analysis.id} className="flex justify-between items-center">
            <span>{analysis.filename}</span>
            <Button onClick={() => onSelectAnalysis(analysis)}>Chat</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

