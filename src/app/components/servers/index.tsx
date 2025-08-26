"use client"

import { Server } from "@/app/types/server.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InputLikeContainer } from "../container/variations/inputlike";
import { Input } from "../input";
import { ServerBar, ServerContainer, ServerStyled } from "./style";

export const Servers = () => {
    const [servers, setServers] = useState<Server[]>([]);

    const getServers = async () => {
        await fetch('/config/servers.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }

                return response.json();
            })
            .then(json => {
                return setServers(json);
            })
            .catch(() => { })
    }

    useEffect(() => {
        getServers();
    }, [])


    return (
        <ServerStyled>
            <ServerContainer>
                <ServerBar className="z-10">
                    <h1 className="text-whiteNFM">Servidores</h1>
                    <div className="flex flex-col justify-center gap-2 lg:gap-4 lg:flex-row">
                        <div className="flex gap-2 lg:gap-4 flex-wrap justify-center">
                            {servers.map((server, index) => (
                                <button key={index} className="flex flex-col items-center">
                                    <div style={{ background: server.color }} className="h-[140px] w-[140px] rounded-lg border-4 border-blackNFM flex justify-center items-center">
                                        <Image src={"/assets/icons/server_alt.svg"} alt="Server Icon" width={100} height={100} />
                                    </div>
                                    <label className="text-greyNFM">{server.name}</label>
                                    <InputLikeContainer className="!px-4 flex justify-center">
                                        <div className="min-w-[50px] text-greyNFM flex justify-evenly items-center w-full">
                                            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "#2DFF96" }}>
                                                <ellipse cx="6" cy="6.99987" rx="6" ry="6.31579" fill="currentColor" />
                                            </svg>
                                            <p>0 ms</p>
                                        </div>
                                    </InputLikeContainer>
                                </button>
                            ))}
                        </div>
                    </div>
                </ServerBar>
            </ServerContainer>
            <div className="flex flex-col gap-2 lg:p-8 pb-8">
                <div className="flex flex-col gap-2 items-center lg:flex-row">
                    <Input
                        name="Nome do Servidor"
                        type="text"
                        id="server-name"
                        placeholder=""
                        className="max-w-[275px] lg:!items-start lg:!text-start"
                    />
                </div>
                <div className="flex flex-col gap-2 items-center lg:flex-row">
                    <Input
                        name="Endereço de IP"
                        type="text"
                        id="server_ip"
                        placeholder="127.0.0.1"
                        className="max-w-[200px] lg:!items-start lg:!text-start"
                    />
                    <Input
                        name="Porta"
                        type="text"
                        id="server_port"
                        placeholder="Ex: 3000"
                        className="max-w-[100px] "
                    />
                    <div className="flex flex-col w-fit items-center">
                        <label className="text-whiteNFM">Status</label>
                        <InputLikeContainer className="!px-4 flex justify-center">
                            ✅
                        </InputLikeContainer>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center lg:w-fit lg:items-start">
                    <Input
                        name="Cor do Servidor"
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