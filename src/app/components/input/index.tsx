"use client";

import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { InputStyled } from "./style";

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    name: string;
    placeholder: string;
    type: "text" | "password";
    id: string;
    className?: string;
    
}

export const Input = (props: InputProps) => {
    const { name, id, className } = props;
    return (
        <InputStyled className={className}>
            <label className="text-whiteNFM" htmlFor={id}>{name}</label>
            <input className="text-whiteNFM" {...props} />
        </InputStyled>
    )
}