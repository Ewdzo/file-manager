"use client";

import { useState } from "react";
import { Button } from "./components/button";
import { Container } from "./components/container";
import { DefaultScreen } from "./components/defaultScreen";
import { Divider } from "./components/divider";
import { Option } from "./components/option";
import { CreateOption, JoinOption } from "./components/option/options";
import { JoinScreen } from "./components/screens/variations/join";

export default function Home() {
  const [option, setOption] = useState<null | "create" | "join">();

  return (
    <DefaultScreen>
      <Container className="relative z-10">
        <h1>Nexus</h1>
        {!option && (
          <>
            <Option
              {...CreateOption}
              onClick={() => setOption("create")}
            />
            <Divider />
            <Option
              {...JoinOption}
              onClick={() => setOption("join")}
            />
          </>
        )}
        {option == "join" && (
          <>
            <JoinScreen>
              <Button onClick={() => setOption(null)} image={{ path: "assets/icons/arrow.svg", alt: "Back Button" }}  >
                Voltar
              </Button>
            </JoinScreen>
          </>
        )}
      </Container>
    </DefaultScreen >
  );
}
