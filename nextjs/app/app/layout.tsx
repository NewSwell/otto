import './globals.css'
import Navigation from './ui/Navigation'
import { SessionProvider } from "next-auth/react"

export const metadata = {
  title: 'otto',
  description:
    'Auto-play music videos from your favorite artists - Discover new artists'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className="h-full bg-gray-50 dark:bg-gray-800">
      <body className="h-full">
      <SessionProvider>
        <Navigation />
        {children}
      </SessionProvider>
      </body>
    </html>
  )
}
