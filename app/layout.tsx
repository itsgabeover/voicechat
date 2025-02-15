import { Inter } from "next/font/google"
import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import type React from "react" // Added import for React
import { ThemeProvider } from "next-themes";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: `%s | Voice Analysis`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}  antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

