"use client";

import { InputLikeContainerStyled } from "./style";

export const InputLikeContainer = ({ children, className }: Readonly<{ children?: React.ReactNode, className?: string }>) => {
    return (
        <InputLikeContainerStyled className={className}>
            {children}
        </InputLikeContainerStyled>
    )
}