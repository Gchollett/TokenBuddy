'use client'

import Battlefield from '@/components/battlefield'
import CardAdder from '@/components/cardAdder'
import DeleteButton from '@/components/deleteButton';
import SideBar from '@/components/sidebar';
import { BattlefieldContext, BattlefieldUpdaterContext } from '@/hooks/useBattlefield';
// import { PopupContext } from '@/hooks/usePopup';
import {battlefield} from '@/utilities/types';
import { useEffect, useState } from 'react';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const start : battlefield = []
  const [battlefield,setBattlefield] = useState(start);
  // const [popup,setPopup] = useState(false);
  const [dark, setDark] = useState(-1)
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
    // <PopupContext.Provider value={setPopup}>
    <BattlefieldUpdaterContext.Provider value = {setBattlefield}>
    <BattlefieldContext.Provider value = {battlefield}>
      <main className="content-center min-h-screen px-1">
        <h1 className="absolute text-3xl left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">Token Buddy</h1>
        <SideBar/>
        <div className='absolute px-1 left-0 top-24 w-screen bg-inherit'>
          <CardAdder/>
        </div>
        <div className='absolute mt-2 px-4 left-0 top-36 flex flex-wrap w-full'>
          <Battlefield/>
          {/* {popup? <div className='mt-5 mx-auto text-center bg-white text-black rounded opacity-75 '><p>Sorry but our backend server is temporarily down :( We don&#39;t know when it will be back up. If you would like to use our service, go to my <a className='underline text-red-600' href={"https://github.com/Gchollett/TokenBuddyBackend"} target="_blank">github</a> and copy the repository for the backend we use to host it locally :)</p></div> : <></>} */}
        </div>
        <DeleteButton/>
        <div>
          <ToastContainer
            pauseOnHover={false}
            theme={dark?'dark':'light'}
          />
        </div>
      </main>
    </BattlefieldContext.Provider>
    </BattlefieldUpdaterContext.Provider>
    // </PopupContext.Provider>
  )
}