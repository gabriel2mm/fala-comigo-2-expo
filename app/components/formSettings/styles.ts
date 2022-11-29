import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

interface LabelProps { 
    color: string
}

export const Container = styled.SafeAreaView`
    padding: 15px 0px;
`;

export const Label = styled.Text<LabelProps>`
    font-size: 16px;
    color: ${props => props.color?? props.color};
`;

export const ItemGroup = styled.View`
    padding: 10px 0px;
`;