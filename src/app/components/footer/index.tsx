"use client";

import Image from "next/image";
import { FooterStyled } from "./style";

export const Footer = () => {
    return (
        <FooterStyled>
            <div className="flex gap-1 items-center">
                <Image
                    src={"/assets/icons/nexus.svg"}
                    alt="Nexus Icon"
                    width={25}
                    height={25} />
                <p>Nexus</p>
            </div>
            <p>2025</p>
            <p> </p>
        </FooterStyled>
    )
}