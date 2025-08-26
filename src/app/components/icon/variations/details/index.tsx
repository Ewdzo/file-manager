"use client";

import { Button } from "@/app/components/button";
import { GreyButton } from "@/app/components/button/variation/greyButton";
import { File } from "@/app/types/file.type";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from 'react-player';
import { DetailsIconStyled } from "./style";

export const DetailsIcon = ({ file, className }: { file: File, className?: string }) => {
    const [play, setPlay] = useState<boolean>(false);

    return (
        <DetailsIconStyled className={className}>
            {play ?
                <>
                    <ReactPlayer
                        className='react-player fixed-bottom'
                        url={file.path.replace("public", "")}
                        width='100%'
                        height='100%'
                        controls={true}

                    />
                    <Button onClick={() => setPlay(false)}>Fechar</Button>
                </>
                :
                <>
                    <div className="hidden lg:flex flex-col gap-1 items-center">
                        <Image
                            alt={file.name + "s Icon"}
                            src={file.logo}
                            height={160}
                            width={500}
                            className="object-contain max-h-[160px] w-fit"
                        />
                    </div>
                    <div className="lg:hidden flex flex-col gap-1 items-center">
                        <Image
                            alt={file.name + "s Icon"}
                            src={file.icon}
                            height={140}
                            width={140}
                            className="border-4 border-blackNFM rounded-lg object-cover w-[140px] h-[140px]"
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-center lg:flex-row">
                        {(file.extension.name == ".mkv" || file.extension.name == ".mp4" || file.extension.name == ".wav") ?
                            <>
                                <Button onClick={() => setPlay(true)}>Assistir</Button>
                                <GreyButton mini image={{ path: "/assets/icons/download.svg", alt: "Download Icon" }}><a href={file.path.replace("public", "")}>Baixar</a></GreyButton>

                            </> :
                            <>
                                <a href={file.path.replace("public", "")}><Button>Abrir</Button></a>
                                <a download={file.name} href={file.path.replace("public", "")}><GreyButton mini image={{ path: "/assets/icons/download.svg", alt: "Download Icon" }}>Baixar</GreyButton></a>
                            </>}
                    </div>
                </>
            }
        </DetailsIconStyled>
    )
}