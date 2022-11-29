import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSpeech } from '../../hooks/useTts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, TextInput } from 'react-native-paper';
import { useConfiguration } from '../../hooks/useConfiguration';
import { useFavorites } from '../../hooks/useFavorites';
import { useListOfContext } from '../../hooks/useListOfText';
import { CardActionButton, CardActionsButtonContainer } from './styles';

const FormComponent : React.FC = () => { 
    const [ text, setText ] : [string, Dispatch<SetStateAction<string>>] = useState("");
   
    const { useTTS } = useSpeech();
    const { addText } = useListOfContext();
    const { favorites, addFavorites, removeFavorites } = useFavorites();
    const {language, rate, pitch, voice, loadConfigs} = useConfiguration();

    useEffect(() => {
        async function loadSync(){  
            await loadConfigs();
        }
        loadSync();

    }, [loadConfigs]);

    const _play  = () : void => {
        _clear();
        useTTS({text, language, pitch, rate, voice});
        addText(text?.toLocaleLowerCase());
    }
    const _clear = () : void => {
        if(!text)
            return;
            
        setText("");
    }

    const _existsFavorite = (text : string) : number => { 
        const lowerCaseText = text.toLocaleLowerCase().trim();
        return favorites.findIndex( t => t.toLocaleLowerCase() === lowerCaseText);
    }

    const _toggleFavorite  = () : void => {
        const lowerCaseText = text.toLocaleLowerCase().trim();
        if( _existsFavorite(text) < 0){
            addFavorites(lowerCaseText)
        }else{
            removeFavorites(lowerCaseText)
        }   
    }

    return (
        <View>
            <TextInput value={text} onChangeText={(text) => setText(text)} mode='outlined' multiline={true} numberOfLines={6}></TextInput>
            <CardActionsButtonContainer>
                <TouchableOpacity accessibilityLabel='Apagar todo texto' accessibilityHint='Apagar todo texto' onPress={() => _clear()}>
                    <CardActionButton width='40px' height='40px' backgroundColor={Colors.black} icon={"refresh"} color={Colors.white}></CardActionButton>
                </TouchableOpacity>
                <TouchableOpacity accessibilityLabel='Reproduzir texto' accessibilityHint='Reproduzir texto' onPress={() => _play()}>
                    <CardActionButton width='60px' height='60px' backgroundColor={Colors.purple700} icon={"play"} color={Colors.white}></CardActionButton>
                </TouchableOpacity>
                <TouchableOpacity accessibilityLabel='adicionar favorito' accessibilityHint='adicionar favorito' onPress={() => _toggleFavorite()}>
                    <CardActionButton width='40px' height='40px' backgroundColor={Colors.black} icon={"heart"} color={_existsFavorite(text) < 0 ?  Colors.white : Colors.red500}></CardActionButton>
                </TouchableOpacity>
            </CardActionsButtonContainer>
        </View>
    )
}

export default FormComponent;