"use client";

import { File } from "@/app/types/file.type";
import { DetailsIcon } from "../../icon/variations/details";
import { DetailsBannerStyled } from "./style";

export const DetailsBanner = ({ file }: { file: File }) => {
    
    return (
        <DetailsBannerStyled $image={file.banner}>
            <DetailsIcon file={file} className="relative z-10"/>
        </DetailsBannerStyled>
    )
}