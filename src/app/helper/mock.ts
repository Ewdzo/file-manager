import { File } from "../types/file.type";
import { Tag } from "../types/tag.type";
import { User } from "../types/user.type";

export const mockUser : User = {
  name: "John Doe",
  email: "johndoe@noone.com",
  password: "fortnite",
  photo: "/assets/images/default_user.png"
}

export const mockTag : Tag = {
  name: "Filmes",
  color: "#6BE2FD"
}

export const mockExtension : Tag = {
  name: ".mkv",
  color: "#2DFF96"
}

export const mockFile: File = {
  name: "The Batman (2022)",
  size: "2.47GB",
  path: "/files/The_Batman.mkv",
  icon: "/files/icon/The_Batman_mkv.png",
  banner: "/files/banner/The_Batman_mkv.png",
  logo: "/files/logo/The_Batman_mkv.png",
  description:
    "Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário se estabelece como a personificação da vingança para a população.",
  tags: [ mockTag ],
  extension: mockExtension,
  owner: mockUser,
  date: "20-04-2025"
};

export const mockSection = {
  title: "Filmes",
  files: [
    mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile, mockFile
  ]
}