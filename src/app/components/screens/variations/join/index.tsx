import { Input } from "@/app/components/input"
import Image from "next/image"
import { ArticleStyled } from "./style"

export const JoinScreen = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
    return (
        <>
            <h1>Juntar-se</h1>
            <ArticleStyled>
                <section>
                    <Image
                        src="/assets/images/join.png"
                        alt="Join Icon"
                        width={140}
                        height={140}
                        className="rounded-lg border-4 border-blackNFM"
                    />
                </section>
                <section className="flex flex-col gap-4 items-center">
                    <p className="md:text-start text-center text-greyNFM max-w-[515px]">
                        Para se juntar a um sistema já existente, solicite que um usuário administrador do sistema de arquivo acesse a configuração de servidores e o adicione.
                        <br />
                        <br />
                        Durante a solicitação informe para o administrador as seguintes informações:
                    </p>
                    <div className="flex flex-col gap-4 items-center lg:-translate-x-1/4">
                        <Input
                            name="Nome do Servidor"
                            type="text"
                            id="server_name"
                            placeholder="Escolha um nome para seu servidor"
                            className="max-w-[250px]"
                        />
                        <div className="flex flex-col items-center gap-4 md:flex-row">
                            <Input
                                name="Endereço de IP"
                                type="text"
                                id="server_ip"
                                placeholder="IPv4 do Computador"
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
                        {children}
                    </div>
                </section>
            </ArticleStyled>
        </>
    )
}