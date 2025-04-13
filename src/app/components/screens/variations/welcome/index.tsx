"use client";

import { ArticleStyled } from "@/app/components/article/style";
import { Button } from "@/app/components/button";
import { GreyButton } from "@/app/components/button/variation/greyButton";
import { InvertedButton } from "@/app/components/button/variation/invertedButton";
import { Container } from "@/app/components/container";
import { Divider } from "@/app/components/divider";
import { Option } from "@/app/components/option";
import { LoginOption, RegisterOption } from "@/app/components/option/options";
import { useState } from "react";
import { Login } from "../login";
import { Register } from "../register";

export default function WelcomeScreen() {
    const [option, setOption] = useState<null | "login" | "register">();

    return (
        <Container className="relative z-10">
            {!option && (
                <>
                    <h1>Nexus</h1>
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
                    <InvertedButton onClick={() => setOption(null)} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }}  >
                        Entrar
                    </InvertedButton>
                    <GreyButton onClick={() => setOption(null)} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }} >
                        Voltar
                    </GreyButton>
                </Login>
            )}
            {
                option == "register" && (
                    <Register>
                        <Button onClick={() => { }}>
                            Cadastrar-se
                        </Button>
                        <GreyButton onClick={() => setOption(null)} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }} >
                            Voltar
                        </GreyButton>
                    </Register>
                )
            }
        </Container>
    );
}
