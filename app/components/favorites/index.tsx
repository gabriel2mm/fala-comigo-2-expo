import React, { memo } from "react";
import { Text } from "react-native";
import { Divider, IconButton, List } from "react-native-paper";
import { useConfiguration } from "../../hooks/useConfiguration";
import { useFavorites } from "../../hooks/useFavorites";
import { useSpeech } from "../../hooks/useTts";
import { Container, TextMessage } from "./styles";

interface props {
    favorites: Array<string>
}

const Favorites: React.FC<props> = ({ favorites }) => {

    const { useTTS } = useSpeech();
    const { language, rate, pitch, voice, loadConfigs } = useConfiguration();
    const { removeFavorites } = useFavorites();

    const _playTTS = (text: string): void => {
        useTTS({ text, language, pitch, rate, voice });
    }

    const _removeFavorite = (text: string): void => {
        removeFavorites(text);
    }

    return (
        <Container>
            {favorites.map((favorite: string) => (
                <>
                    <List.Item accessibilityLabel={favorite} accessibilityHint={`reproduzir ${favorite}`} key={`favorite-item-${favorite}`} title={favorite} onPress={() => _playTTS(favorite)}
                        left={props => <List.Icon {...props} icon="heart" key={`heart-key-${favorite}`}/>}
                        right={props => <IconButton icon="close" onPress={() => _removeFavorite(favorite)} accessibilityLabel={`remover favorito ${favorite}`} key={`close-key-${favorite}`}/>}
                    ></List.Item>
                    {favorites.length > 1 ? (<Divider></Divider>) : null}
                </>))}
                
            {favorites.length <= 0 ? <TextMessage accessibilityLabel="Ainda não há favoritos!">Ainda não há favoritos!</TextMessage> : null}
        </Container>
    )
}

const FavoritesComponent = memo(Favorites);
export default FavoritesComponent;