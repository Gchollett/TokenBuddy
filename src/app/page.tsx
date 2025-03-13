'use client'

import Battlefield from '@/components/battlefield'
import CardAdder from '@/components/cardAdder'
import DeleteButton from '@/components/deleteButton';
import SideBar from '@/components/sidebar';
import { BattlefieldContext, BattlefieldUpdaterContext } from '@/hooks/useBattlefield';
import {battlefield} from '@/utilities/types';
import { useEffect, useState } from 'react';
import {ToastContainer, toast} from 'react-toastify'
import fetchData from "@/utilities/fetchCards";
import { card } from '@/utilities/types';
import { CardContext } from '@/hooks/use-cards';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const start : battlefield = []
  const [battlefield,setBattlefield] = useState(start);
  const [dark, setDark] = useState(-1)
  const cardStart: card[] = []
  const [cards,setCards] = useState(cardStart)
  useEffect(() => {
          fetchData('https://api.scryfall.com/cards/search?q=t%3Atoken&unique=cards').then(response => {
              if(response.length === 0) toast.error("API currently not responding :(")
              setCards(response)
          })
      },[])
  useEffect(()=>{
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = '';
    })
    window.addEventListener('contextmenu',function(e) {
      e.preventDefault();
    })
  })
  useEffect(()=>{
    setDark((window.matchMedia('(prefers-color-scheme: dark)')).matches?1:0);
    if(dark >= 0) toast.info("Now using the Scryfall API!")
  },[dark])
  return (
    <BattlefieldUpdaterContext.Provider value = {setBattlefield}>
    <BattlefieldContext.Provider value = {battlefield}>
    <CardContext.Provider value={cards}>
      <main className="content-center min-h-screen px-1">
        <h1 className="absolute text-3xl left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">Token Buddy</h1>
        <SideBar/>
        <div className='absolute px-1 left-0 top-24 w-screen bg-inherit'>
          <CardAdder/>
        </div>
        <div className='absolute mt-2 px-4 left-0 top-36 flex flex-wrap w-full'>
          <Battlefield/>
        </div>
        <DeleteButton/>
        <div>
          <ToastContainer
            pauseOnHover={false}
            theme={dark?'dark':'light'}
          />
        </div>
      </main>
    </CardContext.Provider>
    </BattlefieldContext.Provider>
    </BattlefieldUpdaterContext.Provider>
  )
}