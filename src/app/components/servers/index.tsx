"use client"

import { mockServer } from "@/app/helper/mock";
import Image from "next/image";
import { InputLikeContainer } from "../container/variations/inputlike";
import { Input } from "../input";
import { ServerBar, ServerContainer, ServerStyled } from "./style";

export const Server = () => {
    const servers = [mockServer, mockServer, mockServer];

    return (
        <ServerStyled>
            <ServerContainer>
                <ServerBar className="z-10">
                    <h1 className="text-whiteNFM">Servidores</h1>
                    <div className="flex flex-col justify-center gap-2 lg:gap-4 lg:flex-row">
                        <div className="flex gap-2 lg:gap-4 flex-wrap justify-center">
                            {servers.map((server, index) => (
                                <button key={index}>
                                    <div style={{ background: server.color }} className="h-[140px] w-[140px] rounded-lg border-4 border-blackNFM flex justify-center items-center">
                                        <Image src={"/assets/icons/server_alt.svg"} alt="Server Icon" width={100} height={100} />
                                    </div>
                                    <label className="text-greyNFM">{server.name}</label>
                                    <InputLikeContainer className="!px-4 flex justify-center">
                                        <div className="min-w-[50px] text-greyNFM flex justify-evenly items-center w-full">
                                            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color: "#2DFF96"}}>
                                                <ellipse cx="6" cy="6.99987" rx="6" ry="6.31579" fill="currentColor" />
                                            </svg>
                                            <p>0 ms</p>
                                        </div>
                                    </InputLikeContainer>
                                </button>
                            ))}
                        </div>
                        <button className="flex flex-col justify-center items-center gap-2 lg:pb-[60px]">
                            <div className="flex h-[40px] w-[40px] justify-center items-center text-xl rounded-[4px] text-blackNFM bg-whiteNFM">+</div>
                            <label className="text-greyNFM">Adicionar Servidor</label>
                        </button>
                    </div>
                </ServerBar>
            </ServerContainer>
            <div className="flex flex-col gap-2 lg:p-8">
                <div className="flex flex-col gap-2 items-center lg:flex-row">
                    <Input
                        name="Nome da Servidor"
                        type="text"
                        id="server-name"
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
                        name="Cor da Servidor"
                        type="text"
                        id="server-color"
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

        </ServerStyled>
    )
}