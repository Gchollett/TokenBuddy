'use client'

import { BattlefieldContext } from "@/hooks/useBattlefield"
import {useContext, useEffect } from "react"
import Card from "./card"

/**
 * Maps all the cards from a battleifield into an html format to display.
 * @returns The html for the battlefield
 */
export default function Battlefield(){
    const battlefield = useContext(BattlefieldContext)
    return(
        <>
            {battlefield.map((card,i) => (
                <Card key={i} card={card} i={i}/>
            ))}
        </>
    )
}