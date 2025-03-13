'use client'
// import useClient from "@/hooks/use-client";
import {battlefield, card} from "@/utilities/types";
import Select, { StylesConfig } from "react-select"
import {Dispatch, FormEvent, SetStateAction, useContext, useState } from "react";
import { BattlefieldContext, BattlefieldUpdaterContext } from "@/hooks/useBattlefield";
import { CardContext } from "@/hooks/use-cards";

type Props = {
    dropDown : Dispatch<SetStateAction<boolean>>
}

const styles : StylesConfig = {
    container: (styles) => ({...styles, backgroundColor:'inherit'}),
    input: (styles) => ({...styles,color:'inherit'}),
    control: (styles,state) => ({...styles,cursor: state.isFocused?'':'pointer', boxShadow:'none', border:'none', minWidth: '250px', width: 'fit', backgroundColor: "inherit"}),
    menu: (styles) => ({...styles,backgroundColor:'inherit'}),
    option: (styles, state) => ({
        textAlign: "center",
        paddingTop: '5px',
        color: state.isFocused?'var(--active-hex)':'inherit',
        cursor: 'pointer'
    })
}
/**
 * @param dropDown - Set function for drop down boolean 
 * @returns - The html for the card form
 */
export default function CardForm(props:Props){
    const battlefield = useContext(BattlefieldContext)
    const updater = useContext(BattlefieldUpdaterContext)
    const cards = useContext(CardContext)
    
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
                    updater(battlefield.concat([{...data,face_number:0,number: 1,tapped: false}]))
                }
            }
        }
        props.dropDown(false)        
    }
    // if(cards.length !== 0) setPopup(false)
    return(
        (cards.length === 0) ? 
        <p>Loading...</p> 
        :
        <form onSubmit={handleSubmit} id="cardForm" className="flex bg-inherit">
            <Select
                className="select-container"
                classNamePrefix='select'
                placeholder='Scry a Token'
                noOptionsMessage= {() => 'Failed to Find'}
                required
                autoFocus
                name="chosenCard"
                isSearchable
                styles={styles}
                options={
                    cards.map((card) => {
                        return {
                            value: JSON.stringify(card),
                            label: card.name
                        }
                    })
                }
            />
            <button type="submit" className="ml-[10px]">+</button>
        </form>
    )
}