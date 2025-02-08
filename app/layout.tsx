import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Insurance Analysis Chat",
  description: "Analyze your life insurance PDFs and chat about the results",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

