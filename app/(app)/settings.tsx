import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import CardComponent from "../components/card";
import SettingsFormComponent from "../components/formSettings";

const SettingsPage: React.FC = () => {
    return (
        <View>
            <Stack.Screen options={{ title: "Configurações" }} />
            <View style={{ height: 10}}></View>
            <CardComponent title="Configurações" subtitle="Customize seu aplicativo">
                <SettingsFormComponent />
            </CardComponent>
        </View>
    )
}

export default SettingsPage;