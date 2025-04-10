"use client";

import { InputStyled } from "./style";

export type InputProps = {
    name: string;
    placeholder: string;
    type: "text" | "password";
    id: string;
    className?: string;
}

export const Input = (props: InputProps) => {
    const { name, placeholder, type, id, className } = props;
    return (
        <InputStyled className={className}>
            <label className="text-whiteNFM" htmlFor={id}>{name}</label>
            <input className="text-whiteNFM" {...props} />
        </InputStyled>
    )
}