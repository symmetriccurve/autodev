#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
let inquirer = require("inquirer");
let shell = require("shelljs");

let goToDirectories = require("./commands/go-to-directories.json");
let yarn = require("./commands/yarn");
let git = require("./commands/git");

let commandLineArguments = process.argv.slice(2);

let menuItems = []
let listOfCommandsFile = {}
let promptMessage = "Could not find any command"


if (commandLineArguments[0] === "folder") {
    listOfCommandsFile = goToDirectories
} else if (commandLineArguments[0] === "yarn") {
    listOfCommandsFile = yarn
}else if(commandLineArguments[0] === "git"){
    /**  bug: Overlapping rebase in VIM, instead use a editor for interactive mode
     * git config --global core.editor "code --wait"
     */
    listOfCommandsFile = git
}


promptMessage = listOfCommandsFile.promptMessage
delete listOfCommandsFile.promptMessage

  for (let key in listOfCommandsFile) {
    const menuItem = key + " --> " + listOfCommandsFile[key].description;
    menuItems.push(menuItem);
  }
  menuItems.push('Cancel')

inquirer
.prompt([
  {
    type: "list",
    name: "choice",
    message: chalk.red(promptMessage),
    choices: menuItems
  }
])
.then(answers => {
  const {choice} = answers
  if(choice === 'Cancel'){
      shell.exit()
      shell.exec('clear')
  }else{
    shell.echo(listOfCommandsFile[answers.choice.split(" --> ")[0]].action)
    shell.exec(listOfCommandsFile[answers.choice.split(" --> ")[0]].action);
  }
});