import { Dispatch, SetStateAction } from "react"

export type card = {
    id: string,
    name: string,
    power: number,
    toughness: number,
    frontImage: string,
    number: number,
    tapped: boolean
}

export type battlefield = card[]

export type playMatt = {
    battlefield: battlefield,
    updater: Dispatch<SetStateAction<battlefield>>,
}