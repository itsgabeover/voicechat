"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { uploadPDFToN8N } from "../utils/n8nIntegration"

export default function PDFUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    try {
      await uploadPDFToN8N(file)
      alert("PDF uploaded and analysis started!")
    } catch (error) {
      console.error("Error uploading PDF:", error)
      alert("Error uploading PDF. Please try again.")
    }
    setUploading(false)
    setFile(null)
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Upload Insurance PDF</h3>
      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4" />
      <Button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload and Analyze"}
      </Button>
    </div>
  )
}

