"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import PDFUpload from "./PDFUpload"
import AnalysisList from "./AnalysisList"
import VoiceChat from "./VoiceChat"

export default function Dashboard() {
  const { data: session } = useSession()
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {session?.user?.name}!</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <PDFUpload />
          <AnalysisList onSelectAnalysis={setSelectedAnalysis} />
        </div>
        <div>
          {selectedAnalysis ? <VoiceChat analysis={selectedAnalysis} /> : <p>Select an analysis to start voice chat</p>}
        </div>
      </div>
    </div>
  )
}

