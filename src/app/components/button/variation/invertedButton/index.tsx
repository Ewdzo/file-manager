"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { ButtonStyled } from "./style";

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    image?: { path: string, alt: string };
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const InvertedButton = ({ children, className, image, onClick }: ButtonProps) => {
    return (
        <ButtonStyled onClick={onClick} className={className}>
            {children}
            {image &&
                <Image
                    src={image.path}
                    alt={image.alt}
                    width={17}
                    height={17}
                    style={{ transform: "scale(-1, -1)" }}
                />
            }
        </ButtonStyled>
    )
}