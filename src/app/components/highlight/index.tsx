"use client";

import { File } from "@/app/types/file.type";
import { Tag } from "@/app/types/tag.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
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
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [maxTags, setMaxTags] = useState<number>(5);
    const [tagQuery, setTagQuery] = useState<string>("");
    const [isTagSelectorOpen, setIsTagSelectorOpen] = useState<boolean>(false);
    const filteredTags = tags.filter(tags => tags.name.toLocaleLowerCase().includes(tagQuery));
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

    return (
        <HighlightStyled>
            {isTagSelectorOpen && <div className="absolute top-0 left-0 bg-black/80 w-screen h-screen min-h-full z-10" onClick={() => setIsTagSelectorOpen(false)}></div>}
            <div id="search-bar">
                <button type="button" id="show-tags" onClick={() => setIsTagSelectorOpen(true)} className="relative bg-whiteNFM rounded-sm w-fit block p-1">
                    {isTagSelectorOpen && <div className="w-64 bg-[#1E1E1E] border-2 border-[#101010] absolute z-20 bottom-0 left-0 p-2 rounded-lg flex flex-col gap-4">
                        <input type="text" id="tag-search" className="text-greyNFM flex-grow bg-[#404040] rounded-lg" placeholder="" onChange={(e) => setTagQuery(e.target.value.toLocaleLowerCase())} />
                        <div className="flex flex-col w-full gap-3">
                            {filteredTags.slice(0, maxTags).map((tag, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Checkbox defaultChecked={selectedTags.includes(tag)} id={"filter-" + tag.name} onChange={(e) => {
                                        if (e.target.checked) setSelectedTags([...(new Set([...selectedTags, tag]))])
                                        else setSelectedTags(selectedTags.filter(t => t.name != tag.name))
                                    }} />
                                    <label htmlFor={"filter-" + tag.name} className="w-fit">
                                        <div style={{ background: tag.color }} className="flex-grow rounded-sm px-8 text-[#101010]">{tag.name}</div>
                                    </label>
                                </div>
                            ))}
                            {maxTags < filteredTags.length &&
                                <div className="flex gap-2 w-full justify-center">
                                    <Button onClick={() => setMaxTags(tags.length)}>Mostrar Todos</Button>
                                </div>
                            }
                        </div>
                    </div>}
                    <Image
                        alt="Settings Icon"
                        src={"/assets/icons/settings.svg"}
                        height={20}
                        width={20}
                    />
                </button>
                <input type="text" className="text-greyNFM" placeholder="Pesquisar" name="" id="" onChange={(e) => setSearchQuery(e.target.value.toLocaleLowerCase())} />
            </div>
            {
                selectedTags?.map(({ name }, index) => (
                    <section key={index}>
                        <h1 className="text-whiteNFM">{name}</h1>
                        <div className="flex gap-4 flex-wrap lg:items-start">
                            {files.filter(file => file.tags.some(tag => tag.name == name)).filter(file => file.name.toLocaleLowerCase().includes(searchQuery)).slice(0, 12).map((file, index) => <AnchorIcon key={index} file={file} />)}
                        </div>
                    </section>
                ))
            }
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