import { useContext } from "react";
import { ListOfTextContext } from "../store/listTexts";

interface stateType {
    texts : Array<string> 
    addText : Function
}

export const useListOfContext = () : stateType => {
    return useContext(ListOfTextContext);
}