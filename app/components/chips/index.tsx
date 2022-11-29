import React, { memo } from "react";
import { Container } from './styles';
import { Chip } from 'react-native-paper';
import { useSpeech } from "../../hooks/useTts";
import { useConfiguration } from "../../hooks/useConfiguration";

interface props{ 
    phrases : Array<string>
}

const Chips : React.FC<props> = ({ phrases }) => { 

    const { useTTS } = useSpeech();
    const {language, rate, pitch, voice} = useConfiguration();

    const chipClick = (text : string) => { 
        useTTS({text, language, pitch, rate, voice});
    }

    return (
        <Container horizontal={true} showsHorizontalScrollIndicator={false}>
            { phrases.reverse().map( ( phrase : string ) => <Chip accessibilityLabel={phrase} accessibilityHint={`reproduzir ${phrase}`} icon="cursor-default-click" key={phrase} onPress={() => chipClick(phrase)}>{phrase.substring(0,30)} {phrase.length >= 30? "..." : null}</Chip>)}
        </Container>
    )
}
const ChipsComponents = memo(Chips);
export default ChipsComponents;