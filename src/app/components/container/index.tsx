"use client";

import { Background, DefaultMain } from "./style";

export const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {

    return (
        <DefaultMain>
            <Background />
            {children}
        </DefaultMain>
    )
}