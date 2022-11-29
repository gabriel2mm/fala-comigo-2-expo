import React from 'react';
import { Stack } from "expo-router";
import { Provider } from "react-native-paper";
import { ConfigurationContextProvider } from "../store/configurationStore";
import { ListOfTextContextProvider } from "../store/listTexts";
import { FavoritesContextProvider } from "../store/favoriteStore";
import { AudioContextProvider } from "../store/audioStore";

const Layout: React.FC = () => {
    return (
        <ConfigurationContextProvider>
            <ListOfTextContextProvider>
                <FavoritesContextProvider>
                    <AudioContextProvider>
                        <Provider>
                            <Stack initialRouteName="home" />
                        </Provider>
                    </AudioContextProvider>
                </FavoritesContextProvider>
            </ListOfTextContextProvider>
        </ConfigurationContextProvider>
    )

}


export default Layout;