Nexus File Manager é um sistema de gerenciamento de arquivos que foca em enriquecer a experiência do usuário no compartilhamento de arquivos em rede local.

O conceito do projeto surgiu a partir da ideia da criação de uma Netflix de catálogo personalizável hospedada localmente.

## Iniciando o Projeto

Para executar a aplicação em modo de desenvolvimento, abra um terminal na pasta onde o repositório foi clonado e execute o comando:

```bash
npm install
```
Com isso todas as dependências do projeto estarão instaladas e o projeto pode ser iniciado usando o comando:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado!

## Sistema de Login

O Nexus File Manager conta com um sistema de cadastro e login que permite a criação de contas personalizadas de usuários que serão utilizadas para armazenar permissões de acesso e personalizações das páginas para o usuário.

No primeiro acesso ao sistema é dado ao usuário a opção de criar um sistema novo ou se juntar como servidor em uma instância já configurada.
![setup](https://github.com/user-attachments/assets/dd231132-8ce4-4f1e-94aa-73d2c591b0ec)

Para a criação de um sistema novo é definido informações do usuário administrador e do servidor.
![setup-create](https://github.com/user-attachments/assets/25670022-751e-4de1-be92-403f6e362b99)

Com o setup já feito o usuário tem agora as opções de Logar-se ou Registrar-se.
![login](https://github.com/user-attachments/assets/26305a06-0b1a-4364-9de6-ebed13959a59)

A tela de acesso:
![login-login](https://github.com/user-attachments/assets/7512a048-f56a-47f5-8f97-bb4dcfb89973)

A tela de registro:
![login-register](https://github.com/user-attachments/assets/1b0459f6-e301-4a0b-9e37-4af537587ccd)

# Página Inicial

A página inicial do sistema trará as seções mais relevantes ao usuário, e em caso da ausência de quaisquer seções cadastradas, é trazido os últimos 12 arquivos cadastrados.
![home](https://github.com/user-attachments/assets/c84508db-9105-4074-b141-94c3384cddb6)

# Página de Busca
A página de busca permite o usuário buscar um arquivo por nome, extensão ou categoria.
![files](https://github.com/user-attachments/assets/d67556d2-3fed-4b4d-9742-f47f71658ae7)

# Página de Categorias

A página de categoria permite o usuário criar ou editar categorias de classificação dos arquivos.
![tags](https://github.com/user-attachments/assets/26fcf201-cd2d-4cb4-bf37-8be20daa20bd)

# Página de Servidores

A página de servidores permite o usuário checar a saúde do sistema e quantos servidores estão disponíveis.
![servers](https://github.com/user-attachments/assets/28a1d1ee-adff-49b6-b516-12897571fbf5)
