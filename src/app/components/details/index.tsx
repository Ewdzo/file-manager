"use client";

import { File } from "@/app/types/file.type";
import { Tag } from "@/app/types/tag.type";
import Image from "next/image";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { Button } from "../button";
import { GreyButton } from "../button/variation/greyButton";
import { Checkbox } from "../checkbox";
import { ImageInputLikeContainer } from "../container/variations/inputimage";
import { InputLikeContainer } from "../container/variations/inputlike";
import { Divider } from "../divider";
import { AnchorIcon } from "../icon/variations/anchor";
import { Input, TextArea } from "../input";
import { DetailsImageInput } from "../input/variations/detailsImage";
import { DetailsStyled } from "./style";

export type DetailsProps = {
    file: File;
}

export const Details = ({ file }: DetailsProps) => {
    const [maxText, setMaxText] = useState<number>(file.description.length);
    const [alteredFile, setAlteredFile] = useState<File>(file);
    const [tagQuery, setTagQuery] = useState<string>("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [fileTags, setFileTags] = useState<Tag[]>(file.tags);
    const [maxTags, setMaxTags] = useState<number>(5);
    const [isTagSelectorOpen, setIsTagSelectorOpen] = useState<boolean>(false);
    const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
    const [chatBotQuery, setChatBotQuery] = useState<string>("");
    const [chatBotResponse, setChatBotResponse] = useState<string>("");
    const filteredTags = tags.filter(tags => tags.name.toLocaleLowerCase().includes(tagQuery));


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

    const handleFileName = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setAlteredFile({ ...alteredFile, name: name || file.name });
    };

    const handleFileDescription = (e: ChangeEvent<HTMLInputElement>) => {
        const description = e.target.value;
        setAlteredFile({ ...alteredFile, description: description || file.description });
    };

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const formElement = document.getElementById('file-edit') as HTMLFormElement;
        const form = new FormData(formElement);

        form.append("tags", JSON.stringify(fileTags));

        fetch("/api/files?path=" + file.path, {
            body: form,
            method: "put",
        }
        ).then((d) => d.json()).then((d) => window.location.href = "file?name=" + (d.data.name))
    }

    const handleDelete = () => {
        fetch("/api/files?path=" + file.path, {
            method: "DELETE"
        }).then(() => {
            window.location.replace("/files")
        });
    }


    const handleSubmitChatBot: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        if (!file.path.endsWith(".pdf")) {
            setChatBotResponse("Chatbot atualmente somente suporta arquivos pdf.");
            return;
        }
        setChatBotResponse("Em processo...");

        fetch("/api/chatbot?file=" + file.path + "&query=" + chatBotQuery, {
            method: "get",
        }
        ).then((d) => d.json()).then((d) => {
            setChatBotResponse(d.message);
        });
    }

    useEffect(() => {
        if (window.innerWidth < 1024) setMaxText(100);
    }, [])

    return (
        <DetailsStyled className="flex flex-col gap-4 pb-6 lg:flex-row lg:gap-8 lg:px-4">
            <div className="flex flex-col gap-4 lg:w-1/2">
                <div className="flex flex-col items-center gap-2 lg:flex-row">
                    <h1 className="text-whiteNFM">{file.name}</h1>
                    <div className="flex gap-2 flex-wrap text-xs">
                        <div className="rounded-sm px-2 py-0.5 w-fit text-xs" style={{ background: file.extension.color }}>{file.extension.name}</div>
                        {file.tags.map((tag, index) => (<div key={index} className="rounded-sm px-4 py-0.5 w-fit text-xs" style={{ background: tag.color }}>{tag.name}</div>))}
                    </div>
                </div>
                <div className="p-4 lg:p-0">
                    <p className="text-center text-whiteNFM flex flex-col items-center gap-2 lg:flex-row lg:text-start">
                        {file.description.slice(0, maxText)}
                        {(maxText < file.description.length) ? (<>...<GreyButton onClick={() => setMaxText(file.description.length)} mini image={{ path: "/assets/icons/info.svg", alt: "Information Icon" }}>Expandir</GreyButton></>)
                            : ""}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 lg:items-start">
                    <h1 className="text-whiteNFM text-center">Similares</h1>
                    <div className="flex gap-4 justify-center lg:items-start">
                        <AnchorIcon file={file} />
                        <AnchorIcon file={file} />
                    </div>
                </div>
            </div>
            <Divider />
            <form action="/api/files" method="POST" encType="multipart/form-data" className="z-10" id="file-edit">
                <div className="flex flex-col items-center justify-center gap-2 text-whiteNFM lg:flex-grow lg:items-start">
                    <div className="w-full flex flex-col gap-2 items-center lg:flex-row lg:gap-4">
                        <Input
                            name="Nome do Arquivo"
                            type="text"
                            id="file-name"
                            defaultValue={file.name}
                            placeholder={file.name}
                            onChange={handleFileName}
                            className="max-w-[275px] lg:!items-start lg:!text-start"
                        />
                        <Input
                            name="Caminho do Arquivo"
                            type="text"
                            id="file-name"
                            defaultValue={file.path}
                            placeholder={file.path}
                            className="hidden"
                        />
                        <div className="flex gap-8 lg:gap-4">
                            <div>
                                <label className="text-whiteNFM">Extensão</label>
                                <InputLikeContainer className="max-w-[90px]">
                                    <div className="text-xs rounded-sm px-2 py-0.5 w-fit text-blackNFM" style={{ background: file.extension.color }}>{file.extension.name}</div>
                                </InputLikeContainer>
                            </div>
                            <Input
                                name="Tamanho"
                                type="text"
                                id="file-size"
                                disabled
                                value={file.size}
                                placeholder={file.size}
                                className="max-w-[90px]"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 lg:flex-row lg:flex-wrap lg:gap-4">
                        <div className="flex gap-8 lg:gap-4">
                            <ImageInputLikeContainer
                                name="Dono"
                                type="text"
                                id="file-owner"
                                disabled
                                defaultValue={file.owner.photo}
                                className="max-w-[100px]"
                                text={file.owner.nickname}
                            />
                            <ImageInputLikeContainer
                                name="Enviado"
                                type="text"
                                id="file-date"
                                disabled
                                defaultValue="/assets/images/calendar.png"
                                placeholder=""
                                className="max-w-[100px]"
                                text={file.date}
                            />
                        </div>
                        <div className="flex gap-8 lg:gap-4">
                            <DetailsImageInput
                                name="Ícone"
                                type="text"
                                id="file-icon"
                                defaultValue={file.icon}
                                className="max-w-[100px]"
                            />
                            <DetailsImageInput
                                name="Logo"
                                type="text"
                                id="file-logo"
                                defaultValue={file.logo}
                                className="max-w-[100px]"
                            />
                        </div>
                        <div className="flex">
                            <DetailsImageInput
                                name="Banner"
                                type="text"
                                id="file-banner"
                                defaultValue={file.banner}
                                className="max-w-[100px]"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 lg:flex-row">
                        <Input
                            name="Descrição"
                            type="text"
                            id="file-description"
                            defaultValue={file.description}
                            placeholder={file.description}
                            onChange={handleFileDescription}
                            className="text-sm lg:!items-start lg:!text-start"
                        />
                        {isTagSelectorOpen && <div className="absolute top-0 left-0 bg-black/80 w-screen h-screen min-h-full z-10" onClick={() => setIsTagSelectorOpen(false)}></div>}
                        <div className="relative w-[275px] text-center lg:text-start">
                            <label className="text-whiteNFM">Categorias</label>
                            <InputLikeContainer className="w-full flex flex-wrap gap-2 items-center">
                                {fileTags.map((tag, index) => (
                                    <div key={index} className="text-xs rounded-sm px-2 py-0.5 w-fit text-blackNFM" style={{ background: tag.color }}>{tag.name}</div>
                                ))}
                                <button className="flex h-[16px] w-[16px] justify-center items-center text-xs rounded-[4px] text-blackNFM bg-whiteNFM" type="button" onClick={() => setIsTagSelectorOpen(true)}>+</button>
                                {isTagSelectorOpen && <div className="w-full bg-[#1E1E1E] border-2 border-[#101010] absolute z-20 bottom-0 left-0 p-2 rounded-lg flex flex-col gap-4">
                                    <input type="text" id="tag-search" className="text-greyNFM flex-grow bg-[#404040] rounded-lg" placeholder="" onChange={(e) => setTagQuery(e.target.value.toLocaleLowerCase())} />
                                    <div className="flex flex-col w-full gap-3">
                                        {filteredTags.slice(0, maxTags).map((tag, index) => (
                                            <div key={index} className="flex gap-2 items-center">
                                                <Checkbox defaultChecked={fileTags.includes(tag)} id={"filter-" + tag.name} onChange={(e) => {
                                                    if (e.target.checked) setFileTags([...(new Set([...fileTags, tag]))])
                                                    else setFileTags(fileTags.filter(t => t.name != tag.name))
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
                            </InputLikeContainer>
                        </div>
                    </div>
                    <div className="w-[275px] text-center lg:text-start">
                        <label className="text-whiteNFM">Ações</label>
                        <InputLikeContainer className="w-full flex flex-wrap gap-2 justify-center items-start p-4 py-8! gap-4 lg:!w-fit lg:!px-2">
                            <button className="flex flex-col items-center justify-center text-center gap-2" onClick={handleDelete} type="button">
                                <Image
                                    width={25}
                                    height={25}
                                    alt="Delete Icon"
                                    src={"/assets/icons/delete.svg"}
                                />
                                <p className="text-xs">Deletar</p>
                            </button>
                            {/* <button className="flex flex-col items-center justify-center text-center max-w-[50px] gap-2">
                                <Image
                                    width={25}
                                    height={25}
                                    alt="Ownership Icon"
                                    src={"/assets/icons/ownership.svg"}
                                />
                                <p className="text-xs">Tornar-se Dono</p>
                            </button> */}
                            {/* <button className="flex flex-col items-center justify-center text-center gap-2">
                                <Image
                                    width={25}
                                    height={25}
                                    alt="Hide Icon"
                                    src={"/assets/icons/hide.svg"}
                                />
                                <p className="text-xs">Ocultar</p>
                            </button> */}
                            <button className="flex flex-col items-center justify-center text-center gap-2" onClick={handleSubmit} type="submit">
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
            </form>
            <div className="absolute bottom-2 right-2">
                <button type="button" onClick={() => setIsChatModalOpen(!isChatModalOpen)}>
                    <Image
                        width={35}
                        height={35}
                        priority
                        alt="Chatbot Icon"
                        src={"/assets/icons/chatbot.svg"}
                        className="rounded-full border border-darkGreyNFM bg-whiteNFM"
                    />
                </button>
                <div className={(isChatModalOpen ? "flex " : "hidden ") + "p-4 border-blackNFM border-2 rounded-lg bg-blackNFM absolute bottom-0 right-0 w-[275px]"}>
                    <button type="button" className="text-whiteNFM absolute right-2 top-0" onClick={() => setIsChatModalOpen(false)}>x</button>
                    <form action="/api/chatbot" className="w-full flex gap-2 flex-col" id="chatbot-form">
                        <Input
                            name="Pergunta"
                            type="text"
                            id="message"
                            placeholder={"Insira aqui sua pergunta"}
                            className="text-sm lg:!items-start lg:!text-start"
                            onChange={(e) => setChatBotQuery(e.target.value)}
                        />
                        <button type="submit" onClick={handleSubmitChatBot}>
                            <InputLikeContainer>
                                <p className="text-xs text-center text-whiteNFM">Enviar</p>
                            </InputLikeContainer>
                        </button>
                        <TextArea
                            name="Resposta"
                            type="text"
                            id="answer"
                            defaultValue={chatBotResponse}
                            placeholder={chatBotResponse}
                            readOnly
                            disabled
                            className="text-sm lg:!items-start lg:!text-start min-h-fit"
                        />
                    </form>
                </div>
            </div>
        </DetailsStyled>
    )
}