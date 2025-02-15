"use client"

export default function Dashboard() {


  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Welcome, </h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p>Analysis list here</p>
        </div>
        <div>
          <p>Select an analysis to start voice chat</p>
        </div>
      </div>
    </div>
  )
}

