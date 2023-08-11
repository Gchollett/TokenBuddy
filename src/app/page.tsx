'use client'

import Battlefield from '@/components/battlefield'
import CardAdder from '@/components/cardAdder'
import {battlefield} from '@/utilities/types';
import { useEffect, useState } from 'react';

export default function Home() {
  useEffect(()=>{
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = '';
    })
    window.addEventListener('contextmenu',function(e) {
      e.preventDefault();
    })
  })
  const start : battlefield = []
  const [battlefield,setBattlefield] = useState(start);
  return (
    <main className="content-center min-h-screen px-1">
      <h1 className="absolute text-3xl left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">Token Buddy</h1>
      <div className='absolute px-1 left-0 top-24 w-screen'>
        <CardAdder battlefield={battlefield} adder={setBattlefield}/>
      </div>
      <div className='absolute px-4 left-0 top-36 flex flex-wrap w-full'>
        <Battlefield battlefield={battlefield} updater={setBattlefield}/>
      </div>
    </main>
  )
}

// {
//   name: "Adorned Pouncer",
//   power: 4,
//   toughness: 4,
//   image: "https://cards.scryfall.io/normal/front/7/1/71dc8556-a658-40e1-8a93-6a62af208a28.jpg?1562639859",
//   number: 1
// },
// {
//   name: "Ajani's Pridemate",
//   power: 2,
//   toughness: 2,
//   image: "https://cards.scryfall.io/normal/front/b/0/b0819e8e-fb7e-43c7-a7cf-d768f43193ac.jpg?1592515934",
//   number: 1
// }