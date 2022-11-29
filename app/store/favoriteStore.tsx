import React, { Dispatch, ReactNode, SetStateAction, useEffect } from "react"
import {AsyncStorage} from "react-native"


interface stateType {
    favorites : Array<string> 
    addFavorites : Function,
    removeFavorites : Function
}

interface providerType {
    children? : ReactNode
}

const INITIAL_STATE : stateType = { 
    favorites: [],
    addFavorites: ()=> {},
    removeFavorites: () => {}
}


export const FavoritesContext : React.Context<stateType> = React.createContext(INITIAL_STATE)


export const FavoritesContextProvider : React.FC<providerType>= ({children}) => {

    const [ favorites, setFavorites] : [Array<string>, Dispatch<SetStateAction<Array<string>>>] = React.useState(INITIAL_STATE.favorites);

    useEffect(() => {
        async function saveFavoritesOnChange(){
            if(favorites.length > 0)
                await AsyncStorage.setItem("fc.favorites", JSON.stringify(favorites));
        }
        saveFavoritesOnChange();
    }, [favorites])

    useEffect(() => {
        async function loadAllFavorites(){
            if(favorites.length <= 0 && await AsyncStorage.getItem("fc.favorites"))
            setFavorites(JSON.parse((await AsyncStorage.getItem("fc.favorites"))!))
        }
        loadAllFavorites();
    }, [])


    const addFavorites = (text : string) : void => {
        if(!text || favorites.includes(text))
            return;
        
        setFavorites([...favorites, text.trim()]);
    }

    const removeFavorites  = (text : string) : void => {
        setFavorites(favorites.filter( item => item !== text));
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorites, removeFavorites}}>
            {children}
        </FavoritesContext.Provider>
    )
}