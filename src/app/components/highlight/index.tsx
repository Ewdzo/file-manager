"use client";

import { File } from "@/app/types/file.type";
import { Icon } from "../icon";
import { HighlightStyled } from "./style";

export const Highlight = ({ file }: { file: File }) => {
    return (
        <HighlightStyled $image={file.banner}>
            <Icon file={file} className="relative z-10"/>
        </HighlightStyled>
    )
}