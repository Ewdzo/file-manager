import fs from "fs";

export const generateFilePath: any = (
  folder: string,
  fileName: string,
) => {
  const pathToCheck = folder + "\\" + fileName;

  if (!fs.existsSync(pathToCheck)) return pathToCheck;

  const hasNumber = fileName.match(/\d+\./);

  if (hasNumber) {
    const number = Number(hasNumber[0].replace(".", "")) + 1;
    const newFileName = fileName.split(hasNumber[0]).join(number + ".");

    return generateFilePath(folder, newFileName, number);
  }

  const name = fileName.split(".");
  const newFileName = name[0] + "_1." + name[1];

  return generateFilePath(folder, newFileName);
};
