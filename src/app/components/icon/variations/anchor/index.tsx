"use client";

import { File } from "@/app/types/file.type";
import Image from "next/image";
import { IconStyled } from "./style";

export const AnchorIcon = ({ file, className }: { file: File, className?: string }) => {
    return (
        <IconStyled className={className}>
            <Image
                alt={file.name + "s Icon"}
                src={file.icon}
                height={140}
                width={140}
                className="border-4 border-blackNFM rounded-lg object-cover w-[140px] h-[140px]"
            />
            <p className="text-greyNFM">{file.name}</p>
        </IconStyled>
    )
}