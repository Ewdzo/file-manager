"use client";

import { Background, DefaultMain } from "./style";

export const DefaultScreen = ({ children }: Readonly<{ children: React.ReactNode }>) => {

    return (
        <DefaultMain>
            <Background />
            {children}
        </DefaultMain>
    )
}