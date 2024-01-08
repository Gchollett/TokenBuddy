import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Token Buddy',
  description: 'An token manager for Magic the Gathering',
  viewport: {width: "device-width", initialScale: 1, minimumScale:1, maximumScale:1},
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='w-full overflow-x-hidden'>
      <body suppressHydrationWarning={true} className='w-full overflow-x-hidden'>
        <div className='w-full overflow-x-hidden'> {/* This div is a wrapper to prevent vertical overflow on IOS devices */}
          {children}
        </div>
      </body>
    </html>
  )
}
