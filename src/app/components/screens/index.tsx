"use client";

import { DefaultMain } from "./style";

export const DefaultScreen = ({ children, className }: Readonly<{ children?: React.ReactNode, className?: string }>) => {
    return (
        <DefaultMain className={className}>
            {children}
        </DefaultMain>
    )
}