import { Button } from "@/app/components/button"
import { Divider } from "@/app/components/divider"
import { Input } from "@/app/components/input"
import { ImageInput } from "@/app/components/input/variations/image"
import { User } from "@/app/types/user.type"
import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import { ArticleStyled } from "./style"

export const Edit = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
    const [defaultUser, setDefaultUser] = useState<User>();
    const [user, setUser] = useState<User>();
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (!token || !token.length) window.location.replace("/");

        fetch("/api/verify", {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}` },
        }).then(async (data) => {
            const res = await data.json();
            return res;
        }).then(res => {
            if (!res.data) window.location.replace("/");
            setUser(res.data)
            setDefaultUser(res.data)
        }).catch(e => alert(e));
    }, [])

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !user || !defaultUser) return;

    const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        if (!name.length) {
            setUser({ ...user, name: defaultUser.name });
            return;
        }

        setUser({ ...user, name: name });
    };

    const handleUserNickName = (e: ChangeEvent<HTMLInputElement>) => {
        const nickname = e.target.value;
        if (!nickname.length) {
            setUser({ ...user, nickname: defaultUser.nickname });
            return;
        }

        setUser({ ...user, nickname: nickname });
    };

    const handleUserPassword = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        if (!password.length) {
            setUser({ ...user, password: defaultUser.password });
            return;
        }

        setUser({ ...user, password: password });
    };

    const handlePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        if (!password.length || password != user.password) {
            // TO-DO
            // return;
        }

        // setUser({...user, password: e.target.value});
    };

    const handleUserEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        if (!email.length) {
            setUser({ ...user, email: defaultUser.email });
            return;
        }

        setUser({ ...user, email: email });
    };

    const handleEdit = () => {
        fetch("/api/edit", {
            method: "POST",
            headers: { 'Content-Type': 'application/json ' },
            body: JSON.stringify({ user: user })
        }).then(() => {
            window.location.reload()
        }).catch(e => alert(e));
    }

    return (
        <>
            <h1>Editar</h1>
            <ArticleStyled>
                <section>
                    <Image
                        src="/assets/images/edit.png"
                        alt="Create Icon"
                        width={140}
                        height={140}
                        className="rounded-lg border-4 border-blackNFM"
                    />
                </section>
                <section className="flex flex-col gap-4 items-center">
                    <p className="md:text-start text-center text-greyNFM max-w-[530px]">
                        Para editar seu usuário, defina as credenciais do usuário e informações para contato.
                    </p>
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 sm:w-3/4 lg:w-full lg:justify-evenly">
                        <div className="flex flex-col gap-4 items-center">
                            <Input
                                name="Usuário"
                                type="text"
                                id="username"
                                placeholder="Insira seu nome de usuário"
                                defaultValue={user.name}
                                onChange={handleUserName}
                                className="max-w-[275px]"
                            />
                            <Input
                                name="Apelido"
                                type="text"
                                id="nickname"
                                defaultValue={user.nickname}
                                placeholder="Insira um apelido para seu usuário"
                                onChange={handleUserNickName}
                                className="max-w-[275px]"
                            />
                            <Input
                                name="Senha"
                                type="password"
                                id="password"
                                placeholder="********"
                                onChange={handleUserPassword}
                                className="max-w-[275px]"
                            />
                            <Input
                                name="Confirmação de Senha"
                                type="password"
                                id="password_confirmation"
                                placeholder="********"
                                onChange={handlePasswordConfirmation}
                                className="max-w-[275px]"
                            />
                            <Input
                                name="E-mail"
                                type="text"
                                id="email"
                                defaultValue={user.email}
                                onChange={handleUserEmail}
                                placeholder="Ex: user@doe.com"
                                className="max-w-[275px]"
                            />
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-4 items-center justify-between">
                            <div className="flex flex-col gap-4 items-center">
                                <ImageInput
                                    name="Ícone do Usuário"
                                    id="icon"
                                    className="max-w-[275px]"
                                />
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                <Button onClick={handleEdit}>
                                    Cadastrar-se
                                </Button>
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </ArticleStyled>
        </>
    )
}