import { useContext } from "react";
import { FavoritesContext } from "../store/favoriteStore";

interface stateType {
    favorites : Array<string> 
    addFavorites : Function,
    removeFavorites : Function
}

export const useFavorites = () : stateType=> {
    return useContext(FavoritesContext);
}