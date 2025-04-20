"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { GreyButtonStyled, MiniGreyButtonStyled } from "./style";

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    image?: { path: string, alt: string };
    mini?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const GreyButton = ({ children, className, image, mini, onClick }: ButtonProps) => {

    if (mini) {
        return (
            <MiniGreyButtonStyled onClick={onClick} className={className}>
                {image &&
                    <Image
                        src={image.path}
                        alt={image.alt}
                        width={16}
                        height={16}
                    />
                }
                {children}
            </MiniGreyButtonStyled>
        )
    }

    return (
        <GreyButtonStyled onClick={onClick} className={className}>
            {image &&
                <Image
                    src={image.path}
                    alt={image.alt}
                    width={16}
                    height={16}
                />
            }
            {children}
        </GreyButtonStyled>
    )
}