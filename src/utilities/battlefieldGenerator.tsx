import { Dispatch, SetStateAction } from "react"
import { battlefield } from "./types"

export default function battlefieldGenerator(updater:Dispatch<SetStateAction<battlefield>>,battlefield:battlefield){
    updater([...battlefield.filter((card) => card.number > 0)])
}