"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { GreyButtonStyled } from "./style";

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    image?: { path: string, alt: string };
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const GreyButton = ({ children, className, image, onClick }: ButtonProps) => {
    return (
        <GreyButtonStyled onClick={onClick} className={className}>
            {image &&
                <Image
                    src={image.path}
                    alt={image.alt}
                    width={11}
                    height={11}
                />
            }
            {children}
        </GreyButtonStyled>
    )
}