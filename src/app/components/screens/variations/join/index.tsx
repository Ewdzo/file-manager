import { Input } from "@/app/components/input"
import Image from "next/image"

export const JoinScreen = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
    return <>
        <Image
            src="/assets/images/join.png"
            alt="Join Icon"
            width={140}
            height={140}
            className="rounded-lg border-4 border-blackNFM"
        />
        <p className="text-center text-greyNFM">
            Para se juntar a um sistema já existente, solicite que um usuário administrador do sistema de arquivo acesse a configuração de servidores e o adicione.
            <br />
            <br />
            Durante a solicitação informe para o administrador as seguintes informações:
        </p>
        <Input
            name="Nome do Servidor"
            type="text"
            id="server_name"
            placeholder="Escolha um nome para seu servidor"
        />
        <Input
            name="Endereço de IP"
            type="text"
            id="server_ip"
            placeholder="Endereço IPv4 do Computador"
        />
        <Input
            name="Porta"
            type="text"
            id="server_port"
            placeholder="Porta da Aplicação"
        />
        {children}
    </>
}