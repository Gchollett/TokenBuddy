import { card } from "@/utilities/types";
import { createContext } from "react";

const start : card[] = []

export const CardContext = createContext(start);