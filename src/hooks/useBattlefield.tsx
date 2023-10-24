import { battlefield } from "@/utilities/types"
import { Context, Dispatch, SetStateAction, createContext } from "react"

const start : battlefield = []

export const BattlefieldContext = createContext(start)
//@ts-ignore
export const BattlefieldUpdaterContext : Context<Dispatch<SetStateAction<battlefield>>> = createContext()