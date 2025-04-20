"use client";

import { File } from "@/app/types/file.type";
import Image from "next/image";
import { Button } from "../button";
import { GreyButton } from "../button/variation/greyButton";
import { IconStyled } from "./style";

export const Icon = ({ file, className }: { file: File, className?: string }) => {
    return (
        <IconStyled className={className}>
            <div className="hidden lg:flex flex-col gap-1 items-center">
                <Image
                    alt={file.name + "s Icon"}
                    src={file.logo}
                    height={160}
                    width={500}
                    className="object-contain max-h-[160px] w-fit"
                />
            </div>
            <div className="lg:hidden flex flex-col gap-1 items-center">
                <h1>{file.name}</h1>
                <Image
                    alt={file.name + "s Icon"}
                    src={file.icon}
                    height={140}
                    width={140}
                    className="border-4 border-blackNFM rounded-lg object-cover w-[140px] h-[140px]"
                />
            </div>
            <div className="flex flex-col gap-2 items-center lg:flex-row">
                <Button>Play</Button>
                <GreyButton mini image={{ path: "/assets/icons/info.svg", alt: "Information Icon" }}>Saiba Mais</GreyButton>
            </div>
        </IconStyled>
    )
}