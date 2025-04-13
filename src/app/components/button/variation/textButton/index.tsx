"use client";

import { MouseEventHandler } from "react";
import { ButtonStyled } from "./style";

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const TextButton = ({ children, className, onClick }: ButtonProps) => {
    return (
        <ButtonStyled onClick={onClick} className={className}>
            {children}
        </ButtonStyled>
    )
}