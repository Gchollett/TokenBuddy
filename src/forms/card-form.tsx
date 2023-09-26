import useClient from "@/hooks/use-client";
import {battlefield} from "@/utilities/types";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";

type Props = {
    battlefield : battlefield,
    adder : Dispatch<SetStateAction<battlefield>>,
    dropDown : Dispatch<SetStateAction<boolean>>
}

export default function CardForm(props:Props){
    const client = useClient();
    const start : battlefield = []
    const [cards, setCards] = useState(start);
    const [searchInput,setSearchInput] = useState("");
    useEffect(() => {
        client.get("/cards")
            .then(response => setCards(response.data.cards))
            .catch(error => console.log(error))
    },[])
    function handleSubmit(e:FormEvent){
        e.preventDefault();
        const form = e.target;
        //@ts-ignore
        const formData = new FormData(form);
        //@ts-ignore
        const dataEntries = [...formData.entries()]
        if(dataEntries !== undefined){
            const data = JSON.parse(dataEntries[0][1])
            const existingIndex = props.battlefield.findIndex(card => card.id === data.id && !card.tapped)
            if(existingIndex !== -1){
                const existingData = props.battlefield[existingIndex]
                existingData.number += 1;
                props.adder([...props.battlefield])
            }else{
                props.adder(props.battlefield.concat([{...data,number: 1,tapped: false}]))
            }
        }
        props.dropDown(false)        
    }
    //@ts-ignore
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }
    return(
        (cards.length === 0) ? 
        <p>Loading...</p> 
        :
        <form onSubmit={handleSubmit} className="flex cardForm">
            {/* <input className="static bg-inherit" type="text" onChange={handleChange} value={searchInput} placeholder="Search..."/>
            <ul className="">
                {
                    cards.filter(card => {
                        return searchInput.length > 0 && card.name.toLowerCase().includes(searchInput.toLowerCase());
                    }).slice(0,10).map((card)=>(<li><button type="button" onClick={() => {setSearchInput(card.name)}} className="">{card.name}</button></li>))
                }
            </ul> */}
            <select className="bg-inherit">
            {
                cards.map((card)=>(<option value={JSON.stringify(card)} className="bg-inherit">{card.name}</option>))
            }
            </select>
            <button type="submit" className="ml-3">Add</button>
        </form>
    )
}