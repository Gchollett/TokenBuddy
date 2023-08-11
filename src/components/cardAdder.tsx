'use client'

import CardForm from "@/forms/card-form";
import {battlefield} from "@/utilities/types";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    battlefield : battlefield
    adder : Dispatch<SetStateAction<battlefield>>,
}

export default function CardAdder(props:Props){
      const [dropDown,setDropDown] = useState(false)
    return(
        <div onClick={()=>{
                setDropDown(true);
            }} className={`grid text-2xl h-fit ${!dropDown ? 'hover:border-green-300 hover:text-green-300' : ''} transition-color w-full p-1 justify-center content-center border border-gray-300 rounded bg-inherit ${!dropDown ? "cursor-pointer" : "cursor-default"}`}>
            {dropDown ? <CardForm adder={props.adder} battlefield={props.battlefield} dropDown={setDropDown}/> : <p className="text-inherit">+</p>}
        </div>
    )
}