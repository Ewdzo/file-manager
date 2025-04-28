import { Button } from "@/app/components/button"
import { Divider } from "@/app/components/divider"
import { Input } from "@/app/components/input"
import { Server } from "@/app/types/server.type"
import { User } from "@/app/types/user.type"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { ArticleStyled } from "./style"

export const Create = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
    const defaultAdmin: User = { name: "admin", nickname: "Administrator", password: "admin", email: "johndoe@gmail.com", photo: "/assets/images/default_user.png" };
    const defaultServer: Server = { IP: "127.0.0.1", port: "3000", name: "Servidor do Administrador", color: "#FFFFFF" };

    const [adminUser, setAdminUser] = useState<User>(defaultAdmin);
    const [adminServer, setAdminServer] = useState<Server>(defaultServer);

    const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        if (!name.length) {
            setAdminUser({ ...adminUser, name: defaultAdmin.name });
            return;
        }

        setAdminUser({ ...adminUser, name: name });
    };

    const handleUserNickName = (e: ChangeEvent<HTMLInputElement>) => {
        const nickname = e.target.value;
        if (!nickname.length) {
            setAdminUser({ ...adminUser, nickname: defaultAdmin.nickname });
            return;
        }

        setAdminUser({ ...adminUser, nickname: nickname });
    };

    const handleUserPassword = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        if (!password.length) {
            setAdminUser({ ...adminUser, password: defaultAdmin.password });
            return;
        }

        setAdminUser({ ...adminUser, password: password });
    };

    const handlePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        if (!password.length || password != adminUser.password) {
            // TO-DO
            // return;
        }

        // setAdminUser({...adminUser, password: e.target.value});
    };

    const handleUserEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        if (!email.length) {
            setAdminUser({ ...adminUser, email: defaultAdmin.email });
            return;
        }

        setAdminUser({ ...adminUser, email: email });
    };

    const handleServerIP = (e: ChangeEvent<HTMLInputElement>) => {
        const ip = e.target.value;
        if (!ip.length) {
            setAdminServer({ ...adminServer, IP: defaultServer.IP });
            return;
        }

        setAdminServer({ ...adminServer, IP: ip });
    };

    const handleServerPort = (e: ChangeEvent<HTMLInputElement>) => {
        const port = e.target.value;
        if (!port.length) {
            setAdminServer({ ...adminServer, port: defaultServer.port });
            return;
        }

        setAdminServer({ ...adminServer, port: port });
    };

    const handleCreate = () => {
        fetch("/api/setup", {
            method: "POST",
            headers: { 'Content-Type': 'application/json ' },
            body: JSON.stringify({ admin: adminUser, server: adminServer })
        })
        .then(() => { window.location.reload() })
        .catch(e => alert(e));
    }

    return (
        <>
            <h1>Criar um Novo</h1>
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
                    <p className="md:text-start text-center text-greyNFM max-w-[515px]">
                        Para criação de um novo sistema Nexus de gerenciamento de arquivos, defina as credenciais do usuário administrador, informações para contato e preencha suas informações de rede.
                    </p>
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 sm:w-3/4 lg:w-full lg:justify-evenly">
                        <div className="flex flex-col gap-4 items-center">
                            <Input
                                name="Usuário Administrador"
                                type="text"
                                id="admin_name"
                                onChange={handleUserName}
                                placeholder="Ex: admin"
                                className="max-w-[200px]"
                            />
                            <Input
                                name="Apelido"
                                type="text"
                                id="admin_nickname"
                                onChange={handleUserNickName}
                                placeholder="Ex: Administrador"
                                className="max-w-[200px]"
                            />
                            <Input
                                name="Senha do Administrador"
                                type="password"
                                id="admin_password"
                                onChange={handleUserPassword}
                                placeholder="********"
                                className="max-w-[200px]"
                            />
                            <Input
                                name="Confirmação de Senha"
                                type="password"
                                id="admin_password_confirmation"
                                onChange={handlePasswordConfirmation}
                                placeholder="********"
                                className="max-w-[200px]"
                            />
                            <Input
                                name="E-mail"
                                type="text"
                                id="admin_email"
                                onChange={handleUserEmail}
                                placeholder="Ex: admin@doe.com"
                                className="max-w-[200px]"
                            />
                        </div>
                        <Divider />
                        <div className="flex flex-col gap-4 items-center justify-between">
                            <div className="flex flex-col gap-4 items-center">
                                <Input
                                    name="Endereço de IP"
                                    type="text"
                                    id="server_ip"
                                    placeholder="Endereço IPv4 do Computador"
                                    className="max-w-[200px]"
                                    onChange={handleServerIP}
                                />
                                <Input
                                    name="Porta"
                                    type="text"
                                    id="server_port"
                                    placeholder="Ex: 3000"
                                    className="max-w-[100px]"
                                    onChange={handleServerPort}
                                />
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                <Button onClick={handleCreate}>
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