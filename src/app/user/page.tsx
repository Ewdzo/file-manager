"use client";

import { GreyButton } from "@/app/components/button/variation/greyButton";
import { Container } from "@/app/components/container";
import { DefaultScreen } from "../components/screens";
import { Edit } from "../components/screens/variations/edit";

export default function WelcomeScreen() {
    return (
        <DefaultScreen>
            <Container className="relative z-10">
                <Edit>
                    <GreyButton onClick={() => window.location.replace("/home")} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }} >
                        Voltar
                    </GreyButton>
                </Edit>
            </Container>
        </DefaultScreen >
    );
}
