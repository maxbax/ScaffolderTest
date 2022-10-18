import _ from 'lodash';
import { simpleGit } from 'simple-git';
import clui from 'clui';
import files from './files.js';
import { askIgnoreFiles, askRecreateProjectFolder } from './inquirier.js';

const { Spinner } = clui;

const createProjectFolder = async (dirPath) => {
  const dirExists = files.directoryExists(dirPath);
  if (dirExists) {
    const answer = await askRecreateProjectFolder();
    if (answer.recreate === 'Yes') {
      files.removeDirectory(dirPath);
    } else {
      throw new Error('Project folder already exists!');
    }
  }
  files.createDirectory(dirPath);
};

const createGitignore = async (folderPath) => {
  const filelist = _.without(files.getAllFiles(folderPath), '.git', '.gitignore');

  let filesToIgnore = [];
  if (filelist.length > 0) {
    const answers = await askIgnoreFiles(filelist);
    filesToIgnore = answers.ignore;
  }

  files.writeFile(`${folderPath}/.gitignore`, filesToIgnore.join('\n'));
};

/**
 * ReadMe file generation
 * @param {*} folderPath
 */
const createReadMe = async (folderPath) => {
  files.writeFile(`${folderPath}/ReadMe.md`, '# Welcome');
};

/**
 * Git repo initialization
 * @param {*} folderPath
 */
const setupRepo = async (folderPath) => {
  const git = simpleGit({
    baseDir: folderPath,
  });
  git.init()
    .then(git.add('.gitignore'))
    .then(git.add('./*'))
    .then(git.commit('Initial commit'));
};

const otherLongOperations = async () => {
  const status = new Spinner('Long operations ...');
  status.start();
  // simulate long operations
  await new Promise((resolve) => {
    setTimeout(() => resolve(), 3000);
  });
  status.stop();
};

export {
  createProjectFolder,
  createGitignore,
  createReadMe,
  setupRepo,
  otherLongOperations,
};
