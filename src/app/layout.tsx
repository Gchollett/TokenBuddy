'use client'
import { useEffect, useState } from 'react'
import './globals.css'
import type { Metadata } from 'next'
import fetchData from "@/utilities/fetchCards";
import { toast } from "react-toastify";
import { card } from '@/utilities/types';
import { CardContext } from '@/hooks/use-cards';

export const metadata: Metadata = {
  title: 'Token Buddy',
  description: 'A token manager for Magic the Gathering',
  viewport: {width: "device-width", initialScale: 1, minimumScale: 1, maximumScale: 1},
  openGraph: {
    title: 'Token Buddy',
    description: 'A token manager for Magic the Gathering',
    url: 'https://tokenbuddy.netlify.app',
    images: ['https://tokenbuddy.netlify.app/thumbnail.png'],
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const start: card[] = []
  const [cards,setCards] = useState(start)
  useEffect(() => {
          fetchData('https://api.scryfall.com/cards/search?q=t%3Atoken&unique=cards').then(response => {
              if(response.length === 0) toast.error("API currently not responding :(")
              setCards(response)
          })
      },[])
  return (
    <html lang="en" className='w-full overflow-x-hidden'>
      <body suppressHydrationWarning={true} className='w-full overflow-x-hidden'>
        <div className='relative w-full overflow-x-hidden'> {/* This div is a wrapper to prevent vertical overflow on IOS devices */}
          <CardContext.Provider value={cards}>
            {children}
          </CardContext.Provider>
        </div>
      </body>
    </html>
  )
}
