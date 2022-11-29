import React from "react";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { SplashScreen } from "expo-router";
import { useFavorites } from "../hooks/useFavorites";
import { useListOfContext } from "../hooks/useListOfText";
import CardComponent from "../components/card";
import HeaderComponent from "../components/header";
import ChipsComponents from "../components/chips";
import FormComponent from "../components/form";
import FavoritesComponent from "../components/favorites";

const HomePage: React.FC = () => {

    const { favorites } = useFavorites();
    const { texts } = useListOfContext();

    const [isReady, setReady] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 1000);
    }, []);

    return (
        <>
            {!isReady && <SplashScreen />}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Stack.Screen options={{ title: "Ínicio", headerShown: false }} />
                <HeaderComponent />
                <CardComponent title="Digite para reproduzir" subtitle="texto para voz">
                    <FormComponent />
                </CardComponent>
                <ChipsComponents phrases={texts} />
                <CardComponent title="Favoritos" subtitle="Salve seus favoritos!">
                    <ScrollView scrollEnabled={true}>
                        <FavoritesComponent favorites={favorites} />
                    </ScrollView>
                </CardComponent>
            </ScrollView>
        </>
    )
}

export default HomePage;