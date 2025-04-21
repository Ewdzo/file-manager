"use client";

import { File } from "@/app/types/file.type";
import { Icon } from "../icon";
import { BannerStyled } from "./style";

export const Banner = ({ file }: { file: File }) => {
    return (
        <BannerStyled $image={file.banner}>
            <Icon file={file} className="relative z-10"/>
        </BannerStyled>
    )
}