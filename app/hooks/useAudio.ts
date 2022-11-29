import React from "react"
import { AudioContext } from "../store/audioStore"

interface stateType {
    audioState : boolean
    togglePlay : Function,
}

export const useAudio = () : stateType => {
    return React.useContext(AudioContext);
}