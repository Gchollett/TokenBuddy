import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Token Buddy',
  description: 'An token manager for Magic the Gathering',
  viewport: {width: "device-width", initialScale: 1, minimumScale:1},
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='w-full overflow-x-hidden'>
      <body suppressHydrationWarning={true} className='w-full overflow-x-hidden'>
        {children}
      </body>
    </html>
  )
}
