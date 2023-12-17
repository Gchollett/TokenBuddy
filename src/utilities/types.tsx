import { Dispatch, SetStateAction } from "react"

export type card = {
    id: string,
    name: string,
    multiFaced: boolean,
    faces:{
        name: string,
        power: number,
        toughness: number,
        image: string
    }[],
    power: number,
    toughness: number,
    image: string,
    number: number,
    face_number: number,
    tapped: boolean
}

export type battlefield = card[]

export type playMatt = {
    battlefield: battlefield,
    updater: Dispatch<SetStateAction<battlefield>>,
}