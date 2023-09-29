'use client'
import useClient from "@/hooks/use-client";
import {battlefield, card} from "@/utilities/types";
import Select, { StylesConfig } from "react-select"
import {Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";

type Props = {
    battlefield : battlefield,
    adder : Dispatch<SetStateAction<battlefield>>,
    dropDown : Dispatch<SetStateAction<boolean>>
}

const styles : StylesConfig = {
    control: (styles) => ({...styles, minWidth: '250px', width: 'fit', backgroundColor: 'black'}),
    option: (styles) => ({
        ...styles,
    })
}

export default function CardForm(props:Props){
    const client = useClient();
    const start : battlefield = []
    const [cards, setCards] = useState(start);
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
        if(dataEntries !== undefined  && dataEntries.length !== 0){
            let data : card;
            try{
                data = JSON.parse(dataEntries[0][1])
            }catch (e){
                return console.error(e);
            }
            if(data){
                const existingIndex = props.battlefield.findIndex(card => card.id === data.id && !card.tapped)
                if(existingIndex !== -1){
                    const existingData = props.battlefield[existingIndex]
                    existingData.number += 1;
                    props.adder([...props.battlefield])
                }else{
                    props.adder(props.battlefield.concat([{...data,number: 1,tapped: false}]))
                }
            }
        }
        props.dropDown(false)        
    }
    return(
        (cards.length === 0) ? 
        <p>Loading...</p> 
        :
        <form onSubmit={handleSubmit} id="cardForm" className="flex cardForm">
            <Select
                name="chosenCard"
                isSearchable
                styles={styles}
                theme= {(theme) => ({
                    ...theme,
                    colors:{
                        ...theme.colors,
                        primary25: 'green',
                        primary: 'grey',
                        neutral0: 'black',
                        primary50: 'lightgreen',
                        neutral80: 'white'
                    }
                })}
                options={
                    cards.map((card) => {
                        return {
                            value: JSON.stringify(card),
                            label: card.name
                        }
                    })
                }
            />
            <button type="submit" className="ml-3">Add</button>
        </form>
    )
}