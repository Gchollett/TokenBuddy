'use client'

import battlefieldGenerator from "@/utilities/battlefieldGenerator"
import {battlefield} from "@/utilities/types"
import { Dispatch, SetStateAction } from "react"

type Props = {
    battlefield : battlefield,
    updater: Dispatch<SetStateAction<battlefield>>
}

export default function Battlefield(props:Props){
    const imageClass = "w-fit h-fit px-6 transition-transform card"
    return(
        <>
            {props.battlefield.map((card,i) => (
                <div className="lg:w-1/6 w-1/3 h-fit">
                    <p id={card.number.toString()} className="ml-4 bg-gray-300 text-black rounded px-1 w-fit cardNumber">{card.number}</p>
                    <img key={i} id={card.name + i.toString()} 
                        onClick={()=> {
                            const image = document.getElementById(card.name + i.toString())
                            const existingTappedCard = props.battlefield.find((tappedCard) => tappedCard.tapped && tappedCard.name == card.name)
                            const existingUntappedCard = props.battlefield.find((untappedCard) => !untappedCard.tapped && untappedCard.name == card.name)
                            if(!card.tapped){
                                card.number -= 1;
                                console.log(existingTappedCard);
                                if(existingTappedCard !== undefined){
                                    existingTappedCard.number += 1;
                                } else {
                                    props.battlefield.splice(i,0,{...card,tapped:true,number:1})
                                    // console.log(props.battlefield)
                                }
                            }else{
                                card.number -= 1;
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
                            battlefieldGenerator(props.updater,props.battlefield)
                        }}   
                        onMouseDown={(e) => {
                            if(e.button == 1){
                                console.log('hi')
                            }
                        }}
                        onAuxClick={() => {
                            const number = document.getElementById(card.number.toString())?.textContent
                            if(Number(number) <= 1){
                                props.battlefield.splice(i,1)
                                // props.updater([...props.battlefield])
                                battlefieldGenerator(props.updater,props.battlefield)
                            }else{
                                card.number -= 1;
                                // props.updater([...props.battlefield])
                                battlefieldGenerator(props.updater,props.battlefield)
                            }
                    }} className={`${imageClass} ${card.tapped ? 'rotate-90':'rotate-0'}`} src={card.frontImage}></img>
                </div>
            ))}
        </>
    )
}