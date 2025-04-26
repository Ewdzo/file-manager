"use client";

import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { CheckboxStyled } from "./style";

export const Checkbox = (props:  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return (
        <CheckboxStyled>
            <input {...props} type="checkbox" />
            <label htmlFor={props.id} />
        </CheckboxStyled>
    )
}