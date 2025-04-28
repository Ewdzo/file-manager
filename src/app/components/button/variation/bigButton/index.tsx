"use client";

import Image from "next/image";
import { ChangeEventHandler } from "react";
import { BigButtonStyled } from "./style";

type ButtonProps = {
    id: string;
    name: string;
    className?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    image?: { path: string, alt: string };
    children?: React.ReactNode;
}

export const BigButton = ({ name, children, className, image, id, onChange }: ButtonProps) => {
    return (
        <>
            <BigButtonStyled htmlFor={id} className={className}>
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
            <input type="file" name={name} className="hidden" id={id} onChange={onChange} />
        </>
    )
}