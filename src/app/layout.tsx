import './globals.css'
import type { Metadata } from 'next'
import Thumbnail from '../public/thumbnail.png'

export const metadata: Metadata = {
  title: 'Token Buddy',
  description: 'A token manager for Magic the Gathering',
  viewport: {width: "device-width", initialScale: 1, minimumScale: 1, maximumScale: 1},
  openGraph: {
    title: 'Token Buddy',
    description: 'A token manager for Magic the Gathering',
    url: 'https://tokenbuddy.netlify.app',
    images: [Thumbnail.src],
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='w-full overflow-x-hidden'>
      <body suppressHydrationWarning={true} className='w-full overflow-x-hidden'>
        <div className='relative w-full overflow-x-hidden'> {/* This div is a wrapper to prevent vertical overflow on IOS devices */}
          {children}
        </div>
      </body>
    </html>
  )
}
