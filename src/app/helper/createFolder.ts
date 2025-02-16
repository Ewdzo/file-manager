import fs from "fs";
import path from "path";

export const createFolder = (location: string) => {
  const folderPath = path.join("./", location);

  if (fs.existsSync(folderPath)) return;

  fs.mkdir(folderPath, (err) => {
    if (err) return console.error(err);
  });
};