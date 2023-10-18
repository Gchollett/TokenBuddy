import { Dispatch, SetStateAction } from "react"
import { battlefield } from "./types"

/**
 * Takes in a Set function to update a useState that holds a battlefield and the battlefield that will be used to update it.
 * It cleans the battlefield by removing all cards whose number is less then or equal to 0
 *  */ 
export default function battlefieldGenerator(updater:Dispatch<SetStateAction<battlefield>>,battlefield:battlefield){
    updater([...battlefield.filter((card) => card.number > 0)])
}