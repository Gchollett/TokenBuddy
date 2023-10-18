'use client'

import CardForm from "@/forms/card-form";
import {battlefield} from "@/utilities/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type Props = {
    battlefield : battlefield,
    adder : Dispatch<SetStateAction<battlefield>>,
    popup: Dispatch<SetStateAction<boolean>>
}

/**
 * 
 * @param battlefield - The battlefield to update
 * @param adder - the battlefield update function
 * @param popup - the Set function for the popup
 * @returns The html for the card adding button
 */

export default function CardAdder(props:Props){
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
            {dropDown ? <CardForm popup={props.popup} adder={props.adder} battlefield={props.battlefield} dropDown={setDropDown}/> : <p className="text-inherit">+</p>}
        </div>
    )
}