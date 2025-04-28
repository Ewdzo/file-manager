"use client";

import { File } from "@/app/types/file.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GreyButton } from "../button/variation/greyButton";
import { ImageInputLikeContainer } from "../container/variations/inputimage";
import { InputLikeContainer } from "../container/variations/inputlike";
import { Divider } from "../divider";
import { AnchorIcon } from "../icon/variations/anchor";
import { Input } from "../input";
import { DetailsImageInput } from "../input/variations/detailsImage";

export type DetailsProps = {
    file: File;
}

export const Details = ({ file }: DetailsProps) => {
    const [maxText, setMaxText] = useState<number>(file.description.length);

    useEffect(() => {
        (window.innerWidth < 1024 && setMaxText(100));
    }, [])

    return (
        <div className="flex flex-col gap-4 pb-6 lg:flex-row lg:gap-8 lg:px-4">
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
                    <div className="flex gap-4 justify-center">
                        <AnchorIcon file={file} />
                        <AnchorIcon file={file} />
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex flex-col items-center justify-center gap-2 text-whiteNFM lg:flex-grow lg:items-start">
                <div className="w-full flex flex-col gap-2 items-center lg:flex-row lg:gap-4">
                    <Input
                        name="Nome do Arquivo"
                        type="text"
                        id="file-name"
                        defaultValue={file.name}
                        placeholder={file.name}
                        className="max-w-[275px] lg:!items-start lg:!text-start"
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
                            disabled
                            defaultValue={file.logo}
                            placeholder=""
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
                        className="text-sm lg:!items-start lg:!text-start"
                    />
                    <div className="w-[275px] text-center lg:text-start">
                        <label className="text-whiteNFM">Extensão</label>
                        <InputLikeContainer className="w-full flex flex-wrap gap-2 items-center">
                            {file.tags.map((tag, index) => (
                                <div key={index} className="text-xs rounded-sm px-2 py-0.5 w-fit text-blackNFM" style={{ background: tag.color }}>{tag.name}</div>
                            ))}
                            <button className="flex h-[16px] w-[16px] justify-center items-center text-xs rounded-[4px] text-blackNFM bg-whiteNFM">+</button>
                        </InputLikeContainer>
                    </div>
                </div>
                <div className="w-[275px] text-center lg:text-start">
                    <label className="text-whiteNFM">Ações</label>
                    <InputLikeContainer className="w-full flex flex-wrap gap-2 justify-center items-start p-4 py-8! gap-4 lg:!w-fit lg:!px-2">
                        <button className="flex flex-col items-center justify-center text-center gap-2">
                            <Image
                                width={25}
                                height={25}
                                alt="Delete Icon"
                                src={"/assets/icons/delete.svg"}
                            />
                            <p className="text-xs">Deletar</p>
                        </button>
                        <button className="flex flex-col items-center justify-center text-center max-w-[50px] gap-2">
                            <Image
                                width={25}
                                height={25}
                                alt="Ownership Icon"
                                src={"/assets/icons/ownership.svg"}
                            />
                            <p className="text-xs">Tornar-se Dono</p>
                        </button>
                        <button className="flex flex-col items-center justify-center text-center gap-2">
                            <Image
                                width={25}
                                height={25}
                                alt="Hide Icon"
                                src={"/assets/icons/hide.svg"}
                            />
                            <p className="text-xs">Ocultar</p>
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
        </div>
    )
}