'use client'

import CardForm from "@/forms/card-form";
import {useEffect, useRef, useState } from "react";

/**
 * @returns The html for the card adding button
 */

export default function CardAdder(){
      const [dropDown,setDropDown] = useState(false)
      const formRef = useRef(null)
      const handleOutsideClick = (e : Event) => {
        // @ts-ignore
        if(formRef.current && !formRef.current.contains(e.target)){
            setDropDown(false);
        }
      }
      useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return (() => {
            document.removeEventListener("mousedown",handleOutsideClick)
        })
      })
    return(
        <div ref={formRef} onClick={()=>{
                setDropDown(true);
            }} className={`grid text-2xl h-12 ${!dropDown ? 'hover:border-green-300 hover:text-green-300 cursor-pointer' : 'cursor-default'} transition-color w-full p-1 justify-center content-center border border-gray-300 rounded bg-inherit`}>
            {dropDown ? <CardForm dropDown={setDropDown}/> : <p className="text-inherit">+</p>}
        </div>
    )
}