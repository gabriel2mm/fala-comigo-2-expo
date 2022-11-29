import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';

export const NavContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 70px;
    
    margin-top: 55px;
    padding: 0px 20px;

    background-color: transparent;

`;

export const LogoPage = styled.Text`
    font-size: 24px;
    font-weight: 800;

`;

export const IconSettings = styled(Feather)`
    font-size: 24px;
`;