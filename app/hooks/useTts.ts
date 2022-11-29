import * as TextToSpeech from 'expo-speech';

interface TTSParameters{ 
    text: string,
    language : string,
    pitch  : number,
    rate : number,
    volume?: number, 
    voice? : string
}

const useTTS  = ({text, language, pitch, rate, voice} : TTSParameters) : void => {
        TextToSpeech.stop();
        TextToSpeech.speak(text, {
            language,
            pitch : +pitch.toFixed(1), 
            rate : +rate.toFixed(1),
            volume : 1,
            voice
        });
}

const getSupportedVoices = () : Promise<TextToSpeech.Voice[]> => {
    return TextToSpeech.getAvailableVoicesAsync();
}

export const useSpeech = () =>  ({ useTTS, getSupportedVoices });
