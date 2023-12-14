'use-client'

import { BattlefieldContext, BattlefieldUpdaterContext } from "@/hooks/useBattlefield"
import battlefieldGenerator from "@/utilities/battlefieldGenerator"
import { card } from "@/utilities/types"
import { KeyboardEventHandler, useContext, useEffect, useRef, useState } from "react"

type Props = {
    card :  card,
    i : number
}

export default function Card(props:Props){
    const battlefield = useContext(BattlefieldContext)
    const updater = useContext(BattlefieldUpdaterContext)
    const imageClass = "px-6 transition-transform"
    const [editing,setEditStatus] = useState(false)
    const [number,setNumber] = useState(props.card.number)
    const cardNumberRef = useRef(null)
    const handleOutsideClick = (e : Event) => {
    // @ts-ignore
    if(cardNumberRef.current && !cardNumberRef.current.contains(e.target)){
        setEditStatus(false);
    }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return (() => {
            document.removeEventListener("mousedown",handleOutsideClick)
        })
    })
    const handleInput : KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter'){
            props.card.number = number;
            battlefieldGenerator(updater,battlefield);
            setEditStatus(false)
        }
    }
    return(
    <div key={props.i+'d'} className="it w-1/4 h-fit max-h-min">
        {!editing?
            <p 
                key={props.i+'p'} 
                id={props.card.number.toString()} 
                className="ml-4 bg-gray-300 text-black rounded px-1 w-fit cardNumber"
                onClick={()=>{setEditStatus(true)}}>
                {props.card.number}
            </p>
        :
            <input 
                id="card-number"
                ref={cardNumberRef}
                autoFocus
                placeholder={props.card.number.toString()}
                className={"ml-4 bg-gray-300 text-black rounded px-1 w-8"}
                onKeyDown={handleInput}
                onChange={(e)=>setNumber(parseInt(e.target.value))}
            />
        }
        <img alt={"card"} key={props.i+'i'} id={props.card.name + props.i.toString()} 
            onClick={(event)=> {
                const image = document.getElementById(props.card.name + props.i.toString())
                if(event.shiftKey){
                    props.card.number += 1;
                }else{
                    if(!props.card.tapped){
                        props.card.number -= 1;
                        const existingTappedCard = battlefield.find((tappedCard) => tappedCard.tapped && tappedCard.name == props.card.name)
                        if(existingTappedCard !== undefined){
                            existingTappedCard.number += 1;
                        } else {
                            battlefield.splice(props.i,0,{...props.card,tapped:true,number:1})
                        }
                    }else{
                        props.card.number -= 1;
                        const existingUntappedCard = battlefield.find((untappedCard) => !untappedCard.tapped && untappedCard.name == props.card.name)
                        if(existingUntappedCard !== undefined){
                            existingUntappedCard.number += 1;
                        } else {
                            battlefield.splice(props.i,0,{...props.card,tapped:false,number:1})
                        }
                    }
                    if(props.card.tapped){
                        image?.setAttribute("class",`${imageClass} rotate-90`)
                    }else{
                        image?.setAttribute("class",`${imageClass} rotate-0`)
                    }
                }
                battlefieldGenerator(updater,battlefield)
            }}
            onAuxClick={() => {
                const number = document.getElementById(props.card.number.toString())?.textContent
                if(Number(number) <= 1){
                    battlefield.splice(props.i,1)
                }else{
                    props.card.number -= 1;
                }
                battlefieldGenerator(updater,battlefield)
        }} className={`${imageClass} ${props.card.tapped ? 'rotate-90':'rotate-0'}`} src={props.card.frontImage}/>
    </div>
    )
}