#!/usr/bin/env node
/* eslint-disable no-console */

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import yargs from 'yargs';
import { askProjectName } from './inquirier.js';
import {
  createGitignore, createProjectFolder, createReadMe, otherLongOperations, setupRepo,
} from './project.js';

clear();

console.log(chalk.yellow(
  figlet.textSync('Scaff Test', { horizontalLayout: 'full' }),
));

const readParams = async () => {
  const { argv } = await yargs(process.argv.splice(2))
    .usage('Usage: $0 [name] [options]')
    .command('name', 'Project name')
    .example('$0 MyTest', 'scaffold MyTest project')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2022');
  await argv;
  return argv;
};

const run = async () => {
  try {
    const argv = await readParams();

    const { projectName } = await askProjectName(argv._[0]);

    await createProjectFolder(projectName);

    const projectPath = `./${projectName}`;

    await createReadMe(projectPath);
    await createGitignore(projectPath);
    await setupRepo(projectPath);
    await otherLongOperations();

    console.log(chalk.green('\nAll done!\n'));
  } catch (err) {
    console.log(chalk.red(`\n${err}\n`));
  }
};

run();
