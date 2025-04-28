import { InvertedButton } from "@/app/components/button/variation/invertedButton"
import { TextButton } from "@/app/components/button/variation/textButton"
import { Input } from "@/app/components/input"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { ArticleStyled } from "./style"

export const Login = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
    const [user, setUser] = useState({ name: "", password: "" });

    const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        if (!name.length) {
            return;
        }

        setUser({ ...user, name: name });
    };

    const handleUserPassword = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        if (!password.length) {
            return;
        }

        setUser({ ...user, password: password });
    };

    const handleLogin = () => {
        fetch(("/api/login?username=" + user.name + "&password=" + user.password), {
            method: "GET",
            headers: { 'Content-Type': 'application/json ' },
        }).then(async (data) => {
            const res = await data.json();
            return res;
        }).then(res => {
            window.localStorage.setItem("token", res.data);
            window.location.replace("/home");
        }).catch(e => alert(e));
    }

    return (
        <>
            <h1>Login</h1>
            <ArticleStyled>
                <section>
                    <Image
                        src="/assets/images/user.png"
                        alt="User Icon"
                        width={100}
                        height={100}
                        className="rounded-lg border-4 border-blackNFM"
                    />
                </section>
                <section className="flex flex-col gap-4 items-center w-full">
                    <Input
                        name="Nome do Usuário"
                        type="text"
                        id="username"
                        placeholder="Nome"
                        className="max-w-[250px] min-w-[180px] w-full"
                        onChange={handleUserName}
                    />
                    <div className="flex flex-col items-center w-full">
                        <Input
                            name="Senha"
                            type="password"
                            id="password"
                            placeholder="********"
                            className="max-w-[250px] min-w-[180px]"
                            onChange={handleUserPassword}
                        />
                        <TextButton>
                            Esqueceu sua senha?
                        </TextButton>
                    </div>
                    <InvertedButton onClick={handleLogin} image={{ path: "assets/icons/arrow.svg", alt: "Login Button" }}  >
                        Entrar
                    </InvertedButton>
                    {children}
                </section>
            </ArticleStyled>
        </>
    )
}