"use client";

import { ArticleStyled } from "@/app/components/article/style";
import { Button } from "@/app/components/button";
import { GreyButton } from "@/app/components/button/variation/greyButton";
import { Container } from "@/app/components/container";
import { Divider } from "@/app/components/divider";
import { Option } from "@/app/components/option";
import { CreateOption, JoinOption } from "@/app/components/option/options";
import { CreateScreen } from "@/app/components/screens/variations/create";
import { JoinScreen } from "@/app/components/screens/variations/join";
import { useState } from "react";

export default function SetupScreen() {
    const [option, setOption] = useState<null | "create" | "join">();

    return (
        <Container className="relative z-10">
            {!option && (
                <>
                    <h1>Nexus</h1>
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
                </>
            )}
            {option == "join" && (
                <JoinScreen>
                    <Button onClick={() => setOption(null)} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }}  >
                        Voltar
                    </Button>
                </JoinScreen>
            )}
            {
                option == "create" && (
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
    );
}
