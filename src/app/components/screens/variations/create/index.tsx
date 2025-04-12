import { Divider } from "@/app/components/divider"
import { Input } from "@/app/components/input"
import Image from "next/image"
import { ArticleStyled } from "./style"

export const CreateScreen = ({ children }: Readonly<{ children?: React.ReactNode }>) => {
    return (
        <ArticleStyled>
            <Image
                src="/assets/images/edit.png"
                alt="Create Icon"
                width={140}
                height={140}
                className="rounded-lg border-4 border-blackNFM"
            />
            <p className="text-center text-greyNFM">
                Para criação de um novo sistema Nexus de gerenciamento de arquivos, defina as credenciais do usuário administrador, informações para contato e preencha suas informações de rede.
            </p>
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
            <Divider />
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
            {children}
        </ArticleStyled>)
}