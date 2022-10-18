import inquirer from 'inquirer';

const askProjectName = (defaultProjectName) => inquirer.prompt([
  {
    message: 'What is the project name?',
    name: 'projectName',
    type: 'string',
    default: defaultProjectName || 'MyTest',
  },
]);

const askRecreateProjectFolder = () => inquirer.prompt([
  {
    message: 'The project folder already exists. Do you want to recreate it?',
    name: 'recreate',
    type: 'list',
    choices: ['Yes', 'No'],
    default: 'Yes',
  },
]);

const askIgnoreFiles = (filelist) => {
  const questions = [
    {
      type: 'checkbox',
      name: 'ignore',
      message: 'Select the files and/or folders you wish to ignore:',
      choices: filelist,
      default: ['node_modules', 'bin'],
    },
  ];
  return inquirer.prompt(questions);
};

export {
  askProjectName,
  askIgnoreFiles,
  askRecreateProjectFolder,
};
