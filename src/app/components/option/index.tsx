"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Button } from "../button";
import { OptionStyled } from "./style";

export type OptionProps = {
    title: string;
    description: string;
    buttonText: string;
    image: string;
    alt: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Option = ({ title, description, buttonText, image, alt, onClick }: OptionProps) => {
    return (
        <OptionStyled>
            <h2 className="text-whiteNFM">{title}</h2>
            <Image
                src={image}
                width={140}
                height={140}
                alt={alt}
                className="rounded-lg border-4 border-blackNFM"
            />
            <p className="text-greyNFM">{description}</p>
            <Button onClick={onClick}>
                {buttonText}
            </Button>
        </OptionStyled>
    )
}