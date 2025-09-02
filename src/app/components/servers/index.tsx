"use client"

import { Server } from "@/app/types/server.type";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import { InputLikeContainer } from "../container/variations/inputlike";
import { Input } from "../input";
import { ServerBar, ServerContainer, ServerStyled } from "./style";

export const Servers = () => {
    const [servers, setServers] = useState<Server[]>([]);
    const [selectedServer, setSelectedServer] = useState<Server>({ name: "", color: "", IP: "", port: "" });
    const [localhost, setLocalhost] = useState<string>("");
    const [port, setPort] = useState<string>("");
    const [option, setOption] = useState<number>(0);
    const [ping, setPing] = useState<number>(0);

    const checkPing = async () => {
        const startTime = Date.now();
        const data = await fetch('/api/ping').then((d) => d.json());
        const endTime = data.timestamp || Date.now();
        const latency = endTime - startTime;
        setPing(latency);

        return latency;
    }

    const getServers = async () => {
        const data = await fetch('/config/servers.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }

                return response.json();
            })
            .catch(() => { })
        return data as Server[];
    }

    useEffect(() => {
        getServers().then((data) => {
            setServers(data);
            setSelectedServer(data[0])
        });
    }, [])

    useEffect(() => {
        setInterval(() => {
            checkPing();
        }, 3000);

        setLocalhost(window.location.hostname);
        setPort(window.location.port);
    }, []);

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        if (option == 0 || !window) return;
        if (!selectedServer || selectedServer.name.length == 0 || selectedServer.color.length == 0) return;
        const server = { ...selectedServer };

        fetch("/api/servers?name=" + selectedServer.name, {
            body: JSON.stringify(server),
            method: "put",
        }).then((d) => {
            if (d.status == 200) window.location.reload();
            if (d.status != 200) alert("Error on create!");
        });
    }

    return (
        <ServerStyled>
            <ServerContainer>
                <ServerBar className="z-10">
                    <h1 className="text-whiteNFM">Servidores</h1>
                    <div className="flex flex-col justify-center gap-2 lg:gap-4 lg:flex-row">
                        <div className="flex gap-2 lg:gap-4 flex-wrap justify-center">
                            {servers.map((server, index) => (
                                <button key={index} className="flex flex-col items-center" onClick={() => setOption(1)}>
                                    <div style={{ background: server.color }} className="h-[140px] w-[140px] rounded-lg border-4 border-blackNFM flex justify-center items-center">
                                        <Image src={"/assets/icons/server_alt.svg"} alt="Server Icon" width={100} height={100} />
                                    </div>
                                    <label className="text-greyNFM">{server.name}</label>
                                    <InputLikeContainer className="!px-4 flex justify-center">
                                        <div className="min-w-[50px] text-greyNFM flex justify-evenly items-center w-full">
                                            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "#2DFF96" }}>
                                                <ellipse cx="6" cy="6.99987" rx="6" ry="6.31579" fill="currentColor" />
                                            </svg>
                                            <p>{ping} ms</p>
                                        </div>
                                    </InputLikeContainer>
                                </button>
                            ))}
                        </div>
                    </div>
                </ServerBar>
            </ServerContainer>
            <form className={option == 0 ? "hidden" : "flex flex-col gap-2 lg:p-8 pb-8"}>
                <div className="flex flex-col gap-2 items-center lg:flex-row">
                    <Input
                        name="Nome do Servidor"
                        type="text"
                        id="server-name"
                        placeholder=""
                        defaultValue={selectedServer?.name}
                        onChange={(e) => setSelectedServer({ ...selectedServer, name: e.target.value })}
                        className="max-w-[275px] lg:!items-start lg:!text-start"
                    />
                </div>
                <div className="flex flex-col gap-2 items-center lg:flex-row">
                    <Input
                        name="Endereço de IP"
                        type="text"
                        id="server_ip"
                        readOnly
                        defaultValue={localhost}
                        placeholder="127.0.0.1"
                        className="max-w-[200px] lg:!items-start lg:!text-start"
                    />
                    <Input
                        name="Porta"
                        type="text"
                        id="server_port"
                        readOnly
                        defaultValue={port}
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
                        maxLength={7}
                        defaultValue={selectedServer?.color}
                        placeholder="#FFF"
                        className="max-w-[120px] lg:!items-start lg:!text-start"
                        onChange={(e) => {
                            const validChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F"];
                            if (e.target.value[0] != "#") e.target.value = "#" + e.target.value.slice(0, 6);
                            if (!validChars.includes(e.target.value[e.target.value.length - 1].toUpperCase())) e.target.value = e.target.value.slice(0, e.target.value.length - 1);
                            e.target.value = e.target.value.toUpperCase();
                            return setSelectedServer({ ...selectedServer, color: e.target.value });
                        }}
                    />
                    <div style={{ background: selectedServer?.color ? selectedServer.color : "#FFF" }} className="h-[100px] w-[100px] rounded-lg border-4 border-blackNFM" />
                </div>
                <div className="flex flex-col items-center justify-center min-w-[275px] text-center lg:text-start lg:items-start text-whiteNFM">
                    <label>Ações</label>
                    <InputLikeContainer className="flex flex-wrap gap-2 items-center !p-4 py-8! gap-4 !w-fit">
                        <button className="flex flex-col items-center justify-center text-center gap-2" onClick={handleSubmit}>
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
        </ServerStyled>
    )
}