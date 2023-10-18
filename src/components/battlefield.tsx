'use client'

import battlefieldGenerator from "@/utilities/battlefieldGenerator"
import {battlefield} from "@/utilities/types"
import { Dispatch, SetStateAction } from "react"

type Props = {
    battlefield : battlefield,
    updater: Dispatch<SetStateAction<battlefield>>
}
/**
 * Maps all the cards from a battleifield into an html format to display.
 * @param battlefield - battlefield (list of cards)
 * @param updater - Dispatch<SetStateAction<battlefield>> (Set function for a useState)
 * @returns The html for the battlefield
 */
export default function Battlefield(props:Props){
    const imageClass = "px-6 transition-transform"
    return(
        <>
            {props.battlefield.map((card,i) => (
                <div key={i+'d'} className="it w-1/4 h-fit max-h-min">
                    <p key={i+'p'} id={card.number.toString()} className="ml-4 bg-gray-300 text-black rounded px-1 w-fit cardNumber">{card.number}</p>
                    <img alt={"card"} key={i+'i'} id={card.name + i.toString()} 
                        onClick={(event)=> {
                            const image = document.getElementById(card.name + i.toString())
                            if(event.shiftKey){
                                card.number += 1;
                            }else{
                                if(!card.tapped){
                                    card.number -= 1;
                                    const existingTappedCard = props.battlefield.find((tappedCard) => tappedCard.tapped && tappedCard.name == card.name)
                                    if(existingTappedCard !== undefined){
                                        existingTappedCard.number += 1;
                                    } else {
                                        props.battlefield.splice(i,0,{...card,tapped:true,number:1})
                                    }
                                }else{
                                    card.number -= 1;
                                    const existingUntappedCard = props.battlefield.find((untappedCard) => !untappedCard.tapped && untappedCard.name == card.name)
                                    if(existingUntappedCard !== undefined){
                                        existingUntappedCard.number += 1;
                                    } else {
                                        props.battlefield.splice(i,0,{...card,tapped:false,number:1})
                                    }
                                }
                                if(card.tapped){
                                    image?.setAttribute("class",`${imageClass} rotate-90`)
                                }else{
                                    image?.setAttribute("class",`${imageClass} rotate-0`)
                                }
                            }
                            battlefieldGenerator(props.updater,props.battlefield)
                        }}
                        onAuxClick={() => {
                            const number = document.getElementById(card.number.toString())?.textContent
                            if(Number(number) <= 1){
                                props.battlefield.splice(i,1)
                                battlefieldGenerator(props.updater,props.battlefield)
                            }else{
                                card.number -= 1;
                                battlefieldGenerator(props.updater,props.battlefield)
                            }
                    }} className={`${imageClass} ${card.tapped ? 'rotate-90':'rotate-0'}`} src={card.frontImage}/>
                </div>
            ))}
        </>
    )
}