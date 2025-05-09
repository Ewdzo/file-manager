"use client";

import { File } from "@/app/types/file.type";
import Image from "next/image";
import { useState } from "react";
import { AnchorIcon } from "../icon/variations/anchor";
import { HighlightStyled } from "./style";

type HighlightProps = {
    sections?: {
        title: string;
        files: File[];
    }[]
}

export const Highlight = ({ sections }: HighlightProps) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <HighlightStyled>
            <div id="search-bar">
                <label htmlFor="show-tags" className="bg-whiteNFM rounded-sm w-fit block p-1">
                    <Image
                        alt="Settings Icon"
                        src={"/assets/icons/settings.svg"}
                        height={20}
                        width={20}
                    />
                </label>
                <input type="checkbox" name="" id="show-tags" />
                <input type="text" className="text-greyNFM" placeholder="Pesquisar" name="" id="" onChange={(e) => setSearchQuery(e.target.value.toLocaleLowerCase())} />
            </div>
            {
                sections?.map(({ title, files }, index) => (
                    <section key={index}>
                        <h1 className="text-whiteNFM">{title}</h1>
                        <div className="flex gap-4 flex-wrap lg:items-start">
                            {files.filter(file => file.name.toLocaleLowerCase().includes(searchQuery)).slice(0, 12).map((file, index) => <AnchorIcon key={index} file={file} />)}
                        </div>
                    </section>
                ))
            }
        </HighlightStyled>
    )
}