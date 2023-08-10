import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Token Buddy',
  description: 'An token manager for Magic the Gathering',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
