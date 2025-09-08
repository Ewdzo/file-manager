"use client";

import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { InputStyled, TextAreaStyled } from "./style";

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    name: string;
    placeholder: string;
    type: "text" | "password";
    id: string;
    label?: string
    className?: string;
    hidden?: boolean;
}

export type TextAreaProps = DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
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

export const TextArea = (props: TextAreaProps) => {
    const { name, id, className, hidden, label } = props;
    return (
        <TextAreaStyled className={hidden ? className : ("flex " + className)}>
            <label className="text-whiteNFM" htmlFor={id}>{label || name}</label>
            <textarea className="text-whiteNFM" {...props} name={name.split(" ").join("_").toLocaleLowerCase()} />
        </TextAreaStyled>
    )
}