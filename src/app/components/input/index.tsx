"use client";

import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { InputStyled } from "./style";

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    name: string;
    placeholder: string;
    type: "text" | "password";
    id: string;
    label?: string
    className?: string;
    hidden?: boolean;
}

export const Input = (props: InputProps) => {
    const { name, id, className, hidden, label } = props;
    return (
        <InputStyled className={hidden ? className : ("flex " + className)}>
            <label className="text-whiteNFM" htmlFor={id}>{label || name}</label>
            <input className="text-whiteNFM" {...props} name={name.split(" ").join("_").toLocaleLowerCase()} />
        </InputStyled>
    )
}