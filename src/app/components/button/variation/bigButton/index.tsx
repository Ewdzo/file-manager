"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { BigButtonStyled } from "./style";

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    image?: { path: string, alt: string };
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const BigButton = ({ children, className, image, onClick }: ButtonProps) => {
    return (
        <BigButtonStyled onClick={onClick} className={className}>
            {image &&
                <Image
                    src={image.path}
                    alt={image.alt}
                    width={50}
                    height={50}
                />
            }
            {children}
        </BigButtonStyled>
    )
}