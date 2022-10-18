import fs from 'fs';
import path from 'path';

export default {
  getCurrentDirectoryBase: () => path.basename(process.cwd()),
  directoryExists: (dirPath) => fs.existsSync(dirPath),
  createDirectory: (dirPath) => fs.mkdirSync(dirPath),
  removeDirectory: (
    dirPath,
    recursive = true,
    force = true,
  ) => fs.rmSync(dirPath, { recursive, force }),
  getAllFiles: (filePath = '.') => fs.readdirSync(filePath),
  writeFile: fs.writeFileSync,
};
