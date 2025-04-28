"use client";

import { ArticleStyled } from "@/app/components/article/style";
import { GreyButton } from "@/app/components/button/variation/greyButton";
import { Container } from "@/app/components/container";
import { Divider } from "@/app/components/divider";
import { Option } from "@/app/components/option";
import { LoginOption, RegisterOption } from "@/app/components/option/options";
import Image from "next/image";
import { useState } from "react";
import { Login } from "../login";
import { Register } from "../register";

export default function WelcomeScreen() {
    const [option, setOption] = useState<null | "login" | "register">();

    return (
        <Container className="relative z-10">
            {!option && (
                <>
                    <div className="flex gap-1 items-center">
                        <Image
                            src={"/assets/icons/nexus.svg"}
                            alt="Nexus Icon"
                            width={50}
                            height={50} />
                        <h1>Nexus</h1>
                    </div>
                    <ArticleStyled>
                        <Option
                            {...LoginOption}
                            onClick={() => setOption("login")}
                        />
                        <Divider />
                        <Option
                            {...RegisterOption}
                            onClick={() => setOption("register")}
                        />
                    </ArticleStyled>
                </>
            )}
            {option == "login" && (
                <Login>
                    <GreyButton onClick={() => setOption(null)} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }} >
                        Voltar
                    </GreyButton>
                </Login>
            )}
            {
                option == "register" && (
                    <Register>
                        <GreyButton onClick={() => setOption(null)} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }} >
                            Voltar
                        </GreyButton>
                    </Register>
                )
            }
        </Container>
    );
}
