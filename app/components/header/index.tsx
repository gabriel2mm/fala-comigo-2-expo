import { Link } from "expo-router";
import React from "react";
import { LogoPage, NavContainer, IconSettings} from "./styles";


const HeaderComponent : React.FC = () => {
    return (
        <NavContainer>
            <LogoPage accessibilityLabel="FalaComigo">FalaComigo</LogoPage>
            <Link href="/settings" accessibilityLabel="ir para configurações" accessibilityHint="ir para configurações">
                <IconSettings name="settings" />
            </Link>
        </NavContainer>
    )
}

export default HeaderComponent;