import { Divider } from "@/app/components/divider"
import { Input } from "@/app/components/input"
import Image from "next/image"
import { ArticleStyled } from "./style"

export const Create = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
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
                                placeholder="Ex: admin"
                                className="max-w-[200px]"
                            />
                            <Input
                                name="Apelido"
                                type="text"
                                id="admin_nickname"
                                placeholder="Ex: Administrador"
                                className="max-w-[200px]"
                            />
                            <Input
                                name="Senha do Administrador"
                                type="password"
                                id="admin_password"
                                placeholder="********"
                                className="max-w-[200px]"
                            />
                            <Input
                                name="Confirmação de Senha"
                                type="password"
                                id="admin_password_confirmation"
                                placeholder="********"
                                className="max-w-[200px]"
                            />
                            <Input
                                name="E-mail"
                                type="text"
                                id="admin_email"
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
                                />
                                <Input
                                    name="Porta"
                                    type="text"
                                    id="server_port"
                                    placeholder="Ex: 3000"
                                    className="max-w-[100px]"
                                />
                            </div>
                            <div className="flex flex-col gap-4 items-center">
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </ArticleStyled>
        </>
    )
}