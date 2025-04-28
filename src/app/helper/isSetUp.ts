import fs from "fs";

export const isSetUp = () => {
    if (!fs.existsSync('./public/config/users.json')) return false;
    if (!fs.existsSync('./public/config/files.json')) return false;
    if (!fs.existsSync('./public/config/servers.json')) return false;

    return true;
}