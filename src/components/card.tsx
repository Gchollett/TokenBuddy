'use-client'

import { BattlefieldContext, BattlefieldUpdaterContext } from "@/hooks/useBattlefield"
import battlefieldGenerator from "@/utilities/battlefieldGenerator"
import { card } from "@/utilities/types"
import { KeyboardEventHandler, useContext, useEffect, useRef, useState } from "react"

type Props = {
    card :  card,
    i : number
}
/**
 * 
 * @param card - the card json data
 * @param i - a number in order to assign to the id
 * @returns the html for the card
 */
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
                if(event.shiftKey){ // shift clicking increases the number of cards by one
                    props.card.number += 1;
                }else if(event.ctrlKey){ // ctrl clicking decreases the number of cards by one
                    props.card.number-=1;
                // }else if(event.altKey){
                //     props.card.tapped = !props.card.tapped
                }else{
                    var number = event.altKey? props.card.number : 1;
                    if(!props.card.tapped){ // normal clicking will tap/untap cards (creating new card piles for the tapped and untapped versions)
                        props.card.number -= number;
                        const existingTappedCard = battlefield.find((tappedCard) => tappedCard.tapped && tappedCard.id == props.card.id && tappedCard.face_number === props.card.face_number) //Checks if there exists a tapped card that is on the same face as well
                        if(existingTappedCard !== undefined){
                            existingTappedCard.number += number;
                        } else {
                            battlefield.splice(props.i,0,{...props.card,tapped:true,number:number})
                        }
                    }else{
                        props.card.number -= number;
                        const existingUntappedCard = battlefield.find((untappedCard) => !untappedCard.tapped && untappedCard.id == props.card.id && untappedCard.face_number === props.card.face_number) //Checks if there exists an untapped card that is on the same face as well
                        if(existingUntappedCard !== undefined){
                            existingUntappedCard.number += number;
                        } else {
                            battlefield.splice(props.i,0,{...props.card,tapped:false,number:number})
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
            onAuxClick={(event) => { //reverses the faces
                var number = event.altKey? props.card.number : 1;
                if(props.card.face_number == 0) {
                    const existingCard = battlefield.find((card) => card.tapped === props.card.tapped && card.id == props.card.id && card.face_number === 1)
                    props.card.number -= number;
                    if(existingCard === undefined){
                        battlefield.splice(props.i,0,{...props.card,face_number:1,number:number})
                    }else{
                        existingCard.number += number;
                    }
                }else{
                    const existingCard = battlefield.find((card) => card.tapped === props.card.tapped && card.id == props.card.id && card.face_number === 0)
                    props.card.number -= number;
                    if(existingCard === undefined){
                        battlefield.splice(props.i,0,{...props.card,face_number:0,number:number})
                    }else{
                        existingCard.number += number;
                    }
                }
                battlefieldGenerator(updater,battlefield)
            }}
            className={`${imageClass} ${props.card.tapped ? 'rotate-90':'rotate-0'}`} src={props.card.multiFaced ? props.card.faces[props.card.face_number].image : props.card.face_number===0 ?props.card.image : "http://eakett.ca/mtgimage/cardback.jpg"}/>
            <p className="text-center">{
                props.card.multiFaced?
                props.card.faces[props.card.face_number].name
                :
                props.card.name + ((props.card.face_number)?" (flipped)":"")
            }</p>
    </div>
    )
}