"use client";

import { ArticleStyled } from "@/app/components/article/style";
import { GreyButton } from "@/app/components/button/variation/greyButton";
import { Container } from "@/app/components/container";
import { Option } from "@/app/components/option";
import { CreateOption } from "@/app/components/option/options";
import { Create } from "@/app/components/screens/variations/create";
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
                    </ArticleStyled>
                </>
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
