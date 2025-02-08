"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useSpeechRecognition } from "react-speech-recognition"

interface VoiceChatProps {
  analysis: {
    id: string
    filename: string
  }
}

export default function VoiceChat({ analysis }: VoiceChatProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  //const recognitionRef = useRef<SpeechRecognition | null>(null) //Removed as we are using useSpeechRecognition hook

  const {
    transcript: speechTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser does not support speech recognition.")
    }
    setTranscript(speechTranscript)
  }, [speechTranscript])

  const toggleListening = () => {
    if (listening) {
      resetTranscript()
    } else {
      //recognitionRef.current?.start()  Removed as we are using useSpeechRecognition hook
    }
    setIsListening(!listening)
  }

  const handleSubmit = async () => {
    // Here you would send the transcript to your API endpoint that interfaces with ChatGPT
    // For now, we'll just set a mock response
    setResponse("This is a mock response from ChatGPT based on your analysis and question.")
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Voice Chat for {analysis.filename}</h3>
      <div className="mb-4">
        <Button onClick={toggleListening}>{listening ? "Stop Listening" : "Start Listening"}</Button>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold">Transcript:</h4>
        <p>{transcript}</p>
      </div>
      <Button onClick={handleSubmit}>Submit Question</Button>
      {response && (
        <div className="mt-4">
          <h4 className="font-semibold">Response:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}

