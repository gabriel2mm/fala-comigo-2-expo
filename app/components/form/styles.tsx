import { IconButton } from "react-native-paper";
import styled from "styled-components/native";

export const CardActionsButtonContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

interface ActionButtonProps{
    backgroundColor : string,
    width?: string
    height?: string
}

export const CardActionButton = styled(IconButton)<ActionButtonProps>`
    background-color: ${props => props.backgroundColor};
    height: ${props => props.height?? "50px"};
    width: ${props => props.width?? "50px"};
    border-radius: 50;
    margin-top: 15px;
`;