import React, { Dispatch, memo, SetStateAction, useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import { Voice } from "expo-speech";
import { useSpeech } from "../../hooks/useTts";
import { PitchOptions, RateOptions } from "./items";
import { Picker } from '@react-native-picker/picker';
import { Colors, Snackbar } from "react-native-paper";
import { Container, ItemGroup, Label } from "./styles";
import { useConfiguration } from "../../hooks/useConfiguration";
import { Button, SafeAreaView, useWindowDimensions } from "react-native";

export const SettingsForm: React.FC = () => {
    const dimensions = useWindowDimensions();
    const { getSupportedVoices } = useSpeech();
    const { saveConfigs, loadConfigs, language, rate, pitch, voice } = useConfiguration();

    const [voices, setVoices]: [Voice[], Dispatch<SetStateAction<Voice[]>>] = useState(new Array<Voice>());
    const [messageVisibility, setMessageVisibility] : [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

    useEffect(() => {
        loadConfigs();
        memorizedSupportedVoices.then(voices => setVoices(voices.sort( (a : Voice , b: Voice ) => a.language.localeCompare(b.language))));
    }, [loadConfigs, language, rate, pitch, voice]);

    const memorizedSupportedVoices = useMemo(async () => {
        return await getSupportedVoices();
    }, [getSupportedVoices]);


    const _save = (values: any): void => {
        setMessageVisibility(true);
        saveConfigs(values.language, 1, values.rate, values.pitch, values.voice);
        setTimeout(() => { setMessageVisibility(false) }, 3000);
    }

    return (
        <SafeAreaView>
            <Snackbar
                style={{ top: dimensions.height / 5 }}
                visible={messageVisibility}
                onDismiss={() => { }}
                action={{
                    label: 'Fechar',
                    onPress: () => {
                        setMessageVisibility(false);
                    },
                }}>
                Configurações salvas com sucesso!
            </Snackbar>
            <Formik
                initialValues={{ language, rate, pitch, voice }}
                onSubmit={values => _save(values)}>
                {({ handleSubmit, setFieldValue, values }) => (
                    <Container>
                        <ItemGroup>
                            <Label color={Colors.grey700}>Selecione o idioma: </Label>
                            <Picker
                                selectedValue={values.language}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFieldValue('language', itemValue)
                                }>

                                {voices.map(voice => <Picker.Item label={voice.language} value={voice.language} key={voice.identifier} />)}
                            </Picker>
                        </ItemGroup>

                        <ItemGroup>
                            <Label color={Colors.grey700}>Selecione a voz: </Label>
                            <Picker
                                selectedValue={values.voice}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFieldValue('voice', itemValue)
                                }>

                                {voices.filter(voice => voice.language === values.language).map(voice => <Picker.Item label={voice.name} value={voice.name} key={voice.name} />)}
                            </Picker>
                        </ItemGroup>

                        <ItemGroup>
                            <Label color={Colors.grey700}>Selecione a velocidade da pronúncia:</Label>
                            <Picker
                                selectedValue={values.rate}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFieldValue('rate', itemValue)
                                }>

                                {RateOptions.map(option => <Picker.Item label={option.label} value={option.value} key={option.label} />)}
                            </Picker>
                        </ItemGroup>


                        <ItemGroup>
                            <Label color={Colors.grey700}>Selecione a voz: </Label>
                            <Picker
                                selectedValue={values.pitch}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFieldValue('pitch', itemValue)
                                }>

                                {PitchOptions.map(option => <Picker.Item label={option.label} value={option.value} key={option.label} />)}
                            </Picker>
                        </ItemGroup>
                        <Button onPress={handleSubmit} color={Colors.black} title="Salvar" />
                    </Container>
                )}
            </Formik>
        </SafeAreaView>
    )
}

const SettingsFormComponent = memo(SettingsForm);
export default SettingsFormComponent;