"use client"

import { File } from "@/app/types/file.type";
import { Tag } from "@/app/types/tag.type";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import { InputLikeContainer } from "../container/variations/inputlike";
import { Input } from "../input";
import { TagBar, TagContainer, TagStyled } from "./style";

export const TagsPage = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTag, setSelectedTag] = useState<Tag>({ name: "", color: "" });
    const [option, setOption] = useState<number>(0);
    const [files, setFiles] = useState<File[]>([]);

    const getFiles = async () => {
        await fetch('/config/files.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(json => {
                return setFiles(json);
            })
            .catch(() => { })
    }

    useEffect(() => {
        getFiles();
    }, [])

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

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        if (option == 0) return;
        if (selectedTag.name.length == 0 || selectedTag.color.length == 0) return;
        const tag = { ...selectedTag };

        fetch("/api/tags?name=" + selectedTag.name, {
            body: JSON.stringify(tag),
            method: option == 1 ? "post" : "put",
        }).then((d) => {
            if (d.status == 200) window.location.reload();
            if (d.status != 200) alert("Error on create!");
        });
    }

    const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        if (option == 0) return;
        if (selectedTag.name.length == 0) return;

        fetch("/api/tags?name=" + selectedTag?.name, {
            method: "DELETE"
        }).then(() => {
            window.location.replace("/tags")
        });
    }

    return (
        <TagStyled>
            <TagContainer>
                <TagBar className="z-10">
                    <h1 className="text-whiteNFM">Categorias</h1>
                    <div className="flex flex-col justify-center gap-2 lg:gap-4 lg:flex-row">
                        <div className="flex gap-2 flex-wrap justify-center lg:gap-4">
                            {tags.map((tag, index) => (
                                <button key={index} onClick={() => {
                                    setSelectedTag(tag);
                                    setOption(2);
                                }}>
                                    <div style={{ background: tag.color }} className="h-[140px] w-[140px] rounded-lg border-4 border-blackNFM" />
                                    <label htmlFor="" className="text-greyNFM">{tag.name}</label>
                                </button>
                            ))}
                        </div>
                        <button className="flex flex-col justify-center items-center gap-2" onClick={() => { setSelectedTag({ name: "", color: "" }); setOption(1) }}>
                            <div className="flex h-[40px] w-[40px] justify-center items-center text-xl rounded-[4px] text-blackNFM bg-whiteNFM">+</div>
                            <label htmlFor="" className="text-greyNFM">Adicionar Categoria</label>
                        </button>
                    </div>
                </TagBar>
            </TagContainer>
            <form className={option == 0 ? "hidden" : "flex flex-col gap-2 lg:p-8"}>
                <div className="flex flex-col gap-2 items-center lg:flex-row">
                    <Input
                        label="Nome da Categoria"
                        name="name"
                        type="text"
                        id="tag-name"
                        placeholder=""
                        defaultValue={selectedTag ? selectedTag.name : ""}
                        className="max-w-[275px] lg:!items-start lg:!text-start"
                        onChange={(e) => setSelectedTag({ ...selectedTag, name: e.target.value })}
                    />
                    <div className="flex flex-col w-fit items-center">
                        <label className="text-whiteNFM">Itens</label>
                        <InputLikeContainer className="!px-4 flex justify-center">
                            <div className="text-xs rounded-sm px-2 py-0.5 min-w-[50px] text-blackNFM" style={{ background: "#2DFF96" }}>{files.filter(f => f.tags.some(tag => tag.name == selectedTag.name && tag.color == selectedTag.color)).length}</div>
                        </InputLikeContainer>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center lg:w-fit lg:items-start min-w-[155px]">
                    <Input
                        label="Cor da Categoria"
                        name="color"
                        type="text"
                        id="tag-color"
                        placeholder={"#FFFFFF"}
                        defaultValue={selectedTag ? selectedTag.color : ""}
                        maxLength={7}
                        className="max-w-[120px] lg:!items-start lg:!text-start"
                        onChange={(e) => {
                            const validChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F"];
                            if (e.target.value[0] != "#") e.target.value = "#" + e.target.value.slice(0, 6);
                            if (!validChars.includes(e.target.value[e.target.value.length - 1].toUpperCase())) e.target.value = e.target.value.slice(0, e.target.value.length - 1);
                            e.target.value = e.target.value.toUpperCase();
                            return setSelectedTag({ ...selectedTag, color: e.target.value });
                        }}
                    />
                    <div style={{ background: selectedTag?.color ? selectedTag.color : "#FFFFFF" }} className="h-[100px] w-[100px] rounded-lg border-4 border-blackNFM" />
                </div>
                <div className="flex flex-col items-center justify-center min-w-[275px] text-center lg:text-start lg:items-start text-whiteNFM">
                    <label>Ações</label>
                    <InputLikeContainer className="flex flex-wrap gap-2 items-center !p-4 py-8! gap-4 !w-fit">
                        <button className="flex flex-col items-center justify-center text-center gap-2" onClick={handleDelete}>
                            <Image
                                width={25}
                                height={25}
                                alt="Delete Icon"
                                src={"/assets/icons/delete.svg"}
                            />
                            <p className="text-xs">Deletar</p>
                        </button>
                        <button className="flex flex-col items-center justify-center text-center gap-2" name={option == 1 ? "post" : "put"} onClick={handleSubmit}>
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
            </form>
        </TagStyled>
    )
}