'use client'
import useClient from "@/hooks/use-client";
import {battlefield, card} from "@/utilities/types";
import Select, { StylesConfig } from "react-select"
import {Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from "react";
import { BattlefieldContext, BattlefieldUpdaterContext } from "@/hooks/useBattlefield";
import { PopupContext } from "@/hooks/usePopup";

type Props = {
    dropDown : Dispatch<SetStateAction<boolean>>
}

const styles : StylesConfig = {
    control: (styles) => ({...styles, minWidth: '250px', width: 'fit', backgroundColor: 'black'}),
    option: (styles) => ({
        ...styles,
    })
}
/**
 * @param dropDown - Set function for drop down boolean 
 * @returns - The html for the card form
 */
export default function CardForm(props:Props){
    const battlefield = useContext(BattlefieldContext)
    const updater = useContext(BattlefieldUpdaterContext)
    const setPopup = useContext(PopupContext)
    const client = useClient();
    const start : battlefield = []
    const [cards, setCards] = useState(start);
    useEffect(() => {
        client.get("/cards")
            .then(response => setCards(response.data.cards))
            .catch(error => {
                if(error.message == 'Network Error'){
                    setPopup(true);
                }
                console.log(error)
            })
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
                const existingIndex = battlefield.findIndex(card => card.id === data.id && !card.tapped)
                if(existingIndex !== -1){
                    const existingData = battlefield[existingIndex]
                    existingData.number += 1;
                    updater([...battlefield])
                }else{
                    updater(battlefield.concat([{...data,number: 1,tapped: false}]))
                }
            }
        }
        props.dropDown(false)        
    }
    if(cards.length !== 0) setPopup(false)
    return(
        (cards.length === 0) ? 
        <p>Loading...</p> 
        :
        <form onSubmit={handleSubmit} id="cardForm" className="flex cardForm">
            <Select
                required
                autoFocus
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