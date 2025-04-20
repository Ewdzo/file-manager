import { Divider } from "@/app/components/divider"
import { Input } from "@/app/components/input"
import { ImageInput } from "@/app/components/input/variations/image"
import Image from "next/image"
import { ArticleStyled } from "./style"

export const Register = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
    return (
        <>
            <h1>Cadastro</h1>
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
                        Para criação de um novo usuário, defina as credenciais do usuário e informações para contato.
                    </p>
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 sm:w-3/4 lg:w-full lg:justify-evenly">
                        <div className="flex flex-col gap-4 items-center">
                            <Input
                                name="Usuário"
                                type="text"
                                id="username"
                                placeholder="Insira seu nome de usuário"
                                className="max-w-[275px]"
                            />
                            <Input
                                name="Apelido"
                                type="text"
                                id="nickname"
                                placeholder="Insira um apelido para seu usuário"
                                className="max-w-[275px]"
                            />
                            <Input
                                name="Senha"
                                type="password"
                                id="password"
                                placeholder="********"
                                className="max-w-[275px]"
                            />
                            <Input
                                name="Confirmação de Senha"
                                type="password"
                                id="password_confirmation"
                                placeholder="********"
                                className="max-w-[275px]"
                            />
                            <Input
                                name="E-mail"
                                type="text"
                                id="email"
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
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </ArticleStyled>
        </>
    )
}