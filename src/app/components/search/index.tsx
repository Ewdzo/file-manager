"use client"

import { mockExtension, mockSection, mockTag } from "@/app/helper/mock";
import { Tag } from "@/app/types/tag.type";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../button";
import { BigButton } from "../button/variation/bigButton";
import { Checkbox } from "../checkbox";
import { Divider } from "../divider";
import { AnchorIcon } from "../icon/variations/anchor";
import { AdvancedFiltering, FileSection, SearchBar, SearchContainer, SearchStyled } from "./style";

export const Search = () => {
    const sections = [mockSection, mockSection];

    const [isAdvancedFiltering, setIsAdvancedFiltering] = useState<boolean>(false);

    const [fileQuery, setFileQuery] = useState<string>("");

    const [tagQuery, setTagQuery] = useState<Tag[]>([]);
    const [filterTagQuery, setFilterTagQuery] = useState<string>("");
    const [maxTags, setMaxTags] = useState<number>(5);
    const tags = [mockTag, mockTag, mockTag, mockTag, mockTag, mockTag, mockTag, mockTag, mockTag, mockTag, mockTag];
    const filteredTags = tags.filter(tags => tags.name.toLocaleLowerCase().includes(filterTagQuery));

    const [extensionQuery, setExtensionQuery] = useState<Tag[]>([]);
    const [filterExtensionQuery, setFilterExtensionQuery] = useState<string>("");
    const [maxExtensions, setMaxExtensions] = useState<number>(5);
    const extensions = [mockExtension, mockExtension, mockExtension, mockExtension, mockExtension, mockExtension, mockExtension];
    const filteredExtensions = extensions.filter(extension => extension.name.toLocaleLowerCase().includes(filterExtensionQuery));

    return (
        <SearchStyled>
            <SearchContainer className="w-full flex items-center justify-center flex-col gap-4 lg:flex-row lg:justify-between">
                <SearchBar className="z-10">
                    <h1 className="text-whiteNFM">Buscar Arquivo</h1>
                    <div className="flex justify-center items-center gap-2 w-full lg:justify-start">
                        <input type="text" className="text-greyNFM flex-grow" placeholder="Digite aqui..." onChange={(e) => setFileQuery(e.target.value.toLocaleLowerCase())} />
                        <label htmlFor="show-tags" className="bg-whiteNFM rounded-sm w-fit block p-1 lg:hidden">
                            <Image
                                alt="Settings Icon"
                                src={"/assets/icons/settings.svg"}
                                height={20}
                                width={20}
                            />
                        </label>
                        <input type="checkbox" id="show-tags" onChange={(e) => setIsAdvancedFiltering(e.target.checked)} />
                    </div>
                </SearchBar>
                <BigButton className="z-10" image={{ path: "/assets/icons/upload.svg", alt: "Upload Icon" }}>Enviar Arquivo</BigButton>
            </SearchContainer>
            <div className="lg:flex lg:flex-row-reverse lg:justify-between">
                <AdvancedFiltering className={!isAdvancedFiltering ? "hidden" : "flex"}>
                    <h1 className="text-whiteNFM">Filtragem Avançada</h1>
                    <div className="flex flex-col align-center text-center gap-2 lg:w-[300px] lg:mb-4">
                        <h2 className="text-whiteNFM lg:text-start">Categorias</h2>
                        <div id="tag-filter">
                            <input type="text" className="text-greyNFM" onChange={(e) => setFilterTagQuery(e.target.value.toLocaleLowerCase())} />
                            <div className="flex flex-col w-full gap-3">
                                {filteredTags.slice(0, maxTags).map((tag, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <Checkbox id={"filter-" + tag.name} onChange={(e) => { e.target.checked ? setTagQuery([...tagQuery, tag]) : setTagQuery(tagQuery.filter(i => i != tag)) }} />
                                        <label htmlFor={"filter-" + tag.name} className="w-fit">
                                            <div style={{ background: tag.color }} className="flex-grow rounded-sm px-8">{tag.name}</div>
                                        </label>
                                    </div>
                                ))}
                                {maxTags < filteredTags.length &&
                                    <div className="flex gap-2 w-full justify-center">
                                        <Button onClick={() => setMaxTags(tags.length)}>Mostrar Todos</Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col align-center text-center gap-2">
                        <h2 className="text-whiteNFM lg:text-start">Extensões</h2>
                        <div id="tag-filter">
                            <input type="text" className="text-greyNFM" onChange={(e) => setFilterExtensionQuery(e.target.value.toLocaleLowerCase())} />
                            <div className="flex flex-col w-full gap-3">
                                {filteredExtensions.slice(0, maxExtensions).map((tag, index) => (
                                    <div key={index} className="flex gap-2 w-full items-center">
                                        <Checkbox id={"filter-" + tag.name} onChange={(e) => { e.target.checked ? setExtensionQuery([...extensionQuery, tag]) : setExtensionQuery(extensionQuery.filter(i => i != tag)) }} />
                                        <label htmlFor={"filter-" + tag.name} className="w-fit">
                                            <div style={{ background: tag.color }} className="px-2 flex-grow rounded-sm">{tag.name}</div>
                                        </label>
                                    </div>
                                ))}
                                {maxExtensions < filteredExtensions.length &&
                                    <div className="flex gap-2 w-full justify-center">
                                        <Button onClick={() => setMaxExtensions(filteredExtensions.length)}>Mostrar Todos</Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </AdvancedFiltering>
                <Divider className="hidden lg:block"/>
                <div className="w-fit lg:max-w-80%">
                    {
                        sections?.map(({ title, files }, index) => {
                            const filteredFiles = files
                                .filter(file => {
                                    if (!tagQuery.length) return true;
                                    return file.tags.some(tag => tagQuery.includes(tag))
                                })
                                .filter(file => {
                                    if (!extensionQuery.length) return true;
                                    return extensionQuery.some(extension => file.path.endsWith(extension.name))
                                }
                                )
                                .filter(file => file.name.toLocaleLowerCase().includes(fileQuery));

                            return (
                                <FileSection key={index} className={filteredFiles.length ? "flex" : "hidden"}>
                                    <h1 className="text-whiteNFM">{title}</h1>
                                    <div className="flex gap-4 flex-wrap">
                                        {filteredFiles.map((file, index) => <AnchorIcon key={index} file={file} />)}
                                    </div>
                                </FileSection>
                            )
                        })
                    }
                </div>
            </div>
        </SearchStyled>
    )
}