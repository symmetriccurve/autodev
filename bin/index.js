#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
var inquirer = require('inquirer');
var shell = require('shelljs');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'where do you want to go ?',
      choices: [
        'Portfolio - pf',
        'Profile Baker - pb',
        'Shruthi portfolio - ss'
      ]
    }
  ])
  .then(answers => {
      
    switch(answers.choice){
        case "Portfolio - pf": {
            console.log("Going into your portfolio")
            shell.exec('cd /Users/vikrambelde/Personal\ Projects/portfolio/ && code .');
        }
        break;
        case "Profile Baker - pb": {
            console.log("Going into your profile Baker")
            shell.exec('cd /Users/vikrambelde/resume-builder && code .');
        }
        break;

        default: {
            console.log("Wrong option")
        }
        
        shell.exec('clear');

    }
  });