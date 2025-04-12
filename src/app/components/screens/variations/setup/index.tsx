"use client";

import { ArticleStyled } from "@/app/components/article/style";
import { Button } from "@/app/components/button";
import { GreyButton } from "@/app/components/button/variation/greyButton";
import { Container } from "@/app/components/container";
import { DefaultScreen } from "@/app/components/defaultScreen";
import { Divider } from "@/app/components/divider";
import { Option } from "@/app/components/option";
import { CreateOption, JoinOption } from "@/app/components/option/options";
import { useState } from "react";
import { CreateScreen } from "../create";
import { JoinScreen } from "../join";

export default function Home() {
    const [option, setOption] = useState<null | "create" | "join">();

    return (
        <DefaultScreen>
            <Container className="relative z-10">
                <h1>Nexus</h1>
                {!option && (
                    <ArticleStyled>
                        <Option
                            {...CreateOption}
                            onClick={() => setOption("create")}
                        />
                        <Divider />
                        <Option
                            {...JoinOption}
                            onClick={() => setOption("join")}
                        />
                    </ArticleStyled>
                )}
                {option == "join" && (
                    <JoinScreen>
                        <Button onClick={() => setOption(null)} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }}  >
                            Voltar
                        </Button>
                    </JoinScreen>
                )}
                {option == "create" && (
                    <CreateScreen>
                        <Button onClick={() => { }}>
                            Cadastrar-se
                        </Button>
                        <GreyButton onClick={() => setOption(null)} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }} >
                            Voltar
                        </GreyButton>
                    </CreateScreen>

                )
                }
            </Container>
        </DefaultScreen >
    );
}
