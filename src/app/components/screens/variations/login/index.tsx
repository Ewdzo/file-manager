import { TextButton } from "@/app/components/button/variation/textButton"
import { Input } from "@/app/components/input"
import Image from "next/image"
import { ArticleStyled } from "./style"

export const Login = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
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
                    />
                    <div className="flex flex-col items-center w-full">
                        <Input
                            name="Senha"
                            type="password"
                            id="password"
                            placeholder="********"
                            className="max-w-[250px] min-w-[180px]"
                        />
                        <TextButton>
                            Esqueceu sua senha?
                        </TextButton>
                    </div>
                    {children}
                </section>
            </ArticleStyled>
        </>
    )
}