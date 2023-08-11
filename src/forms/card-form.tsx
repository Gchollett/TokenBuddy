import cards from "@/utilities/dummyCards";
import {battlefield} from "@/utilities/types";
import { Dispatch, FormEvent, SetStateAction } from "react";

type Props = {
    battlefield : battlefield,
    adder : Dispatch<SetStateAction<battlefield>>,
    dropDown : Dispatch<SetStateAction<boolean>>
}

export default function CardForm(props:Props){
    function handleSubmit(e:FormEvent){
        e.preventDefault();
        const form = e.target;
        //@ts-ignore
        const formData = new FormData(form);
        //@ts-ignore
        const dataEntries = [...formData.entries()]
        if(dataEntries !== undefined){
            const data = JSON.parse(dataEntries[0][1])
            const existingIndex = props.battlefield.findIndex(card => card.name === data.name)
            if(existingIndex !== -1){
                const existingData = props.battlefield[existingIndex]
                existingData.number += 1;
                props.adder([...props.battlefield])
            }else{
                props.adder(props.battlefield.concat([data]))
            }
        }
        props.dropDown(false)        
    }
    return(
        <form onSubmit={handleSubmit} className="flex cardForm">
            {/* <select className="bg-inherit" name="chosenCard">
                {cards.map((card)=>(<option className="text-white" value={JSON.stringify(card)}>{card.name}</option>))}
            </select> */}
            <div>
                <input className="bg-inherit text-inherit border border-grey-300 rounded" type='text'/>
                <ul>
                {cards.map((card)=>(<option className="text-white" value={JSON.stringify(card)}>{card.name}</option>))}
                </ul>
            </div>
            <button type="submit">Add</button>
        </form>
    )
}