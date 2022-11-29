import React, { Dispatch, ReactNode, useEffect } from "react"
import {AsyncStorage} from "react-native"

interface stateType {
    language: string,
    volume: number,
    rate: number,
    pitch: number,
    voice: string,
    saveConfigs: Function,
    loadConfigs: Function
}

interface providerType {
    children?: ReactNode
}

const INITIAL_STATE: stateType = {
    language: "pt-BR",
    volume: 1,
    rate: 1,
    pitch: 1,
    voice: "",
    saveConfigs: () => { },
    loadConfigs: () => { },
}

export const ConfigurationContext: React.Context<stateType> = React.createContext(INITIAL_STATE)


export const ConfigurationContextProvider: React.FC<providerType> = ({ children }) => {
    const [language, setLanguage]: [string, Dispatch<React.SetStateAction<string>>] = React.useState("pt-BR");
    const [volume, setVolume]: [number, Dispatch<React.SetStateAction<number>>] = React.useState(1);
    const [rate, setRate]: [number, Dispatch<React.SetStateAction<number>>] = React.useState(1);
    const [pitch, setPitch]: [number, Dispatch<React.SetStateAction<number>>] = React.useState(1);
    const [voice, setVoice]: [string, Dispatch<React.SetStateAction<string>>] = React.useState("");

    const saveConfigs = async (language: string, volume: number, rate: number, pitch: number, voice: string): Promise<void> => {
        setLanguage(language);
        setVolume(volume);
        setRate(rate);
        setPitch(pitch);
        setVoice(voice);

        const strJson = JSON.stringify({ language, volume, rate, pitch, voice });
        await AsyncStorage.setItem("fc.configs", strJson);
    }

    const loadConfigs = async (): Promise<void> => {
        if(!(await AsyncStorage.getItem("fc.configs")))
            return;

        const jsonUnparsed= await AsyncStorage.getItem("fc.configs");    
        const json = JSON.parse(jsonUnparsed!)
        setLanguage(json.language);
        setVolume(json.volume);
        setRate(json.rate);
        setPitch(json.pitch);
        setVoice(json.voice);
    }

    useEffect(() => {
        async function loadConfigsSync(){
            await loadConfigs();
        }
        loadConfigsSync();
    }, []);

    return (
        <ConfigurationContext.Provider value={{ language, volume, rate, pitch, voice, saveConfigs, loadConfigs }}>
            {children}
        </ConfigurationContext.Provider>
    )

}