import React, { ReactNode } from 'react'
import { Container, CardSubtitle, CardTitle } from './styles';

interface props { 
    title?: string,
    subtitle?: string,
    children? : ReactNode
}

const CardComponent: React.FC<props> = ({ title, subtitle, children }) => {
    return (
        <Container>
            <CardSubtitle accessibilityLabel={subtitle}>{subtitle}</CardSubtitle>
            <CardTitle accessibilityLabel={title}>{title}</CardTitle>
            {children}
        </Container>
    )
}

export default CardComponent;