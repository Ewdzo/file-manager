"use client";

import { ContainerStyled } from "./style";

export const Container = ({ children, className }: Readonly<{ children?: React.ReactNode, className?: string }>) => {
    return (
        <ContainerStyled className={className}>
            {children}
        </ContainerStyled>
    )
}