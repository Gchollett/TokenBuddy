'use client'

import Battlefield from '@/components/battlefield'
import CardAdder from '@/components/cardAdder'
import { BattlefieldContext, BattlefieldUpdaterContext } from '@/hooks/useBattlefield';
import { PopupContext } from '@/hooks/usePopup';
import {battlefield} from '@/utilities/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const [popup,setPopup] = useState(false);
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
    <PopupContext.Provider value={setPopup}>
    <BattlefieldUpdaterContext.Provider value = {setBattlefield}>
    <BattlefieldContext.Provider value={battlefield}>
      <main className="content-center min-h-screen px-1">
        <h1 className="absolute text-3xl left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">Token Buddy</h1>
        <div className='absolute px-1 left-0 top-24 w-screen'>
          <CardAdder/>
        </div>
        <div className='absolute mt-2 px-4 left-0 top-36 flex flex-wrap w-full'>
          <Battlefield/>
          {popup? <div className='mt-5 mx-auto text-center bg-white text-black rounded opacity-75 '><p className=''>Sorry but our backend server is temporarily down :( We don't know when it will be back up. If you would like to use our service, go to my <a className='underline text-red-600' href={"https://github.com/Gchollett/TokenBuddy"} target="_blank">github</a> and copy the repositories :)</p></div> : <></>}
        </div>
      </main>
    </BattlefieldContext.Provider>
    </BattlefieldUpdaterContext.Provider>
    </PopupContext.Provider>
  )
}