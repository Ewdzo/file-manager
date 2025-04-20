"use client";

import { DefaultMain, HomeMain } from "./style";

export const DefaultScreen = ({ children, className }: Readonly<{ children?: React.ReactNode, className?: string }>) => {
    return (
        <DefaultMain className={className}>
            {children}
        </DefaultMain>
    )
}

export const HomeScreen = ({ children, className }: Readonly<{ children?: React.ReactNode, className?: string }>) => {
    return (
        <HomeMain className={className}>
            {children}
        </HomeMain>
    )
}