"use client"

import { Tag } from "@/app/types/tag.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InputLikeContainer } from "../container/variations/inputlike";
import { Input } from "../input";
import { TagBar, TagContainer, TagStyled } from "./style";

export const TagsPage = () => {
    const [tags, setTags] = useState<Tag[]>([]);

    const getTags = async () => {
        await fetch('/config/tags.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }

                return response.json();
            })
            .then(json => {
                return setTags(json);
            })
            .catch(() => { })
    }

    useEffect(() => {
        getTags();
    }, [])

    return (
        <TagStyled>
            <TagContainer>
                <TagBar className="z-10">
                    <h1 className="text-whiteNFM">Categorias</h1>
                    <div className="flex flex-col justify-center gap-2 lg:gap-4 lg:flex-row">
                        <div className="flex gap-2 flex-wrap justify-center lg:gap-4">
                            {tags.map((tag, index) => (
                                <button key={index}>
                                    <div style={{ background: tag.color }} className="h-[140px] w-[140px] rounded-lg border-4 border-blackNFM" />
                                    <label htmlFor="" className="text-greyNFM">{tag.name}</label>
                                </button>
                            ))}
                        </div>
                        <button className="flex flex-col justify-center items-center gap-2">
                            <div className="flex h-[40px] w-[40px] justify-center items-center text-xl rounded-[4px] text-blackNFM bg-whiteNFM">+</div>
                            <label htmlFor="" className="text-greyNFM">Adicionar Categoria</label>
                        </button>
                    </div>
                </TagBar>
            </TagContainer>
            <div className="flex flex-col gap-2 lg:p-8">
                <div className="flex flex-col gap-2 items-center lg:flex-row">
                    <Input
                        name="Nome da Categoria"
                        type="text"
                        id="tag-name"
                        placeholder=""
                        className="max-w-[275px] lg:!items-start lg:!text-start"
                    />
                    <div className="flex flex-col w-fit items-center">
                        <label className="text-whiteNFM">Itens</label>
                        <InputLikeContainer className="!px-4 flex justify-center">
                            <div className="text-xs rounded-sm px-2 py-0.5 min-w-[50px] text-blackNFM" style={{ background: "#2DFF96" }}>0</div>
                        </InputLikeContainer>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center lg:w-fit lg:items-start min-w-[155px]">
                    <Input
                        name="Cor da Categoria"
                        type="text"
                        id="tag-color"
                        placeholder="#FFFFFF"
                        className="max-w-[120px] lg:!items-start lg:!text-start"
                    />
                    <div style={{ background: "white" }} className="h-[100px] w-[100px] rounded-lg border-4 border-blackNFM" />
                </div>
                <div className="flex flex-col items-center justify-center min-w-[275px] text-center lg:text-start lg:items-start text-whiteNFM">
                    <label>Ações</label>
                    <InputLikeContainer className="flex flex-wrap gap-2 items-center !p-4 py-8! gap-4 !w-fit">
                        <button className="flex flex-col items-center justify-center text-center gap-2">
                            <Image
                                width={25}
                                height={25}
                                alt="Delete Icon"
                                src={"/assets/icons/delete.svg"}
                            />
                            <p className="text-xs">Deletar</p>
                        </button>
                        <button className="flex flex-col items-center justify-center text-center gap-2">
                            <Image
                                width={25}
                                height={25}
                                alt="Save Icon"
                                src={"/assets/icons/save.svg"}
                            />
                            <p className="text-xs">Salvar</p>
                        </button>
                    </InputLikeContainer>
                </div>
            </div>

        </TagStyled>
    )
}