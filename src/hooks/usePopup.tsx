import { Context, Dispatch, SetStateAction, createContext } from "react";
//@ts-ignore
export const PopupContext : Context<Dispatch<SetStateAction<boolean>>> = createContext();