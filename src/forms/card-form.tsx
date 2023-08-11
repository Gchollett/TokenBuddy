import {battlefield} from "@/utilities/types";
import { data } from "autoprefixer";
import { Dispatch, FormEvent, SetStateAction } from "react";

type Props = {
    battlefield : battlefield,
    adder : Dispatch<SetStateAction<battlefield>>,
    dropDown : Dispatch<SetStateAction<boolean>>
}

export default function CardForm(props:Props){
    const cards = [{
        name: "Adorned Pouncer",
        power: 4,
        toughness: 4,
        frontImage: "https://cards.scryfall.io/border_crop/front/7/1/71dc8556-a658-40e1-8a93-6a62af208a28.jpg?1562639859",
        number: 1,
        tapped: false
      },
      {
        name: "Ajani's Pridemate",
        power: 2,
        toughness: 2,
        frontImage: "https://cards.scryfall.io/border_crop/front/b/0/b0819e8e-fb7e-43c7-a7cf-d768f43193ac.jpg?1592515934",
        number: 1,
        tapped: false
      }];
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
        <form onSubmit={handleSubmit} className="inline cardForm">
            <select className="bg-inherit" name="chosenCard">
                {cards.map((card)=>(<option className="text-white" value={JSON.stringify(card)}>{card.name}</option>))}
            </select>
            <button type="submit">Add</button>
        </form>
    )
}