"use client";

import { ArticleStyled } from "@/app/components/article/style";
import { Button } from "@/app/components/button";
import { GreyButton } from "@/app/components/button/variation/greyButton";
import { Container } from "@/app/components/container";
import { Divider } from "@/app/components/divider";
import { Option } from "@/app/components/option";
import { CreateOption, JoinOption } from "@/app/components/option/options";
import { Create } from "@/app/components/screens/variations/create";
import { Join } from "@/app/components/screens/variations/join";
import Image from "next/image";
import { useState } from "react";

export default function SetupScreen() {
    const [option, setOption] = useState<null | "create" | "join">();

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
                <Join>
                    <Button onClick={() => setOption(null)} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }}  >
                        Voltar
                    </Button>
                </Join>
            )}
            {
                option == "create" && (
                    <Create>
                        <GreyButton onClick={() => setOption(null)} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }} >
                            Voltar
                        </GreyButton>
                    </Create>
                )
            }
        </Container>
    );
}
