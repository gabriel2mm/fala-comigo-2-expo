import React from "react"
import { ConfigurationContext } from "../store/configurationStore";

interface stateType {
    language: string,
    volume: number,
    rate: number,
    pitch: number,
    voice: string,
    saveConfigs: Function,
    loadConfigs: Function
}

export const useConfiguration  = () : stateType => {
    return React.useContext(ConfigurationContext);
}