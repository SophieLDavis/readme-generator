const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
    // Title
    {
        type: 'input',
        name: 'title',
        message: 'What is your project title?'
    },
    // Description
    {
        type: 'input',
        name: 'description',
        message: 'Please put your project description'
    },
    // Installation guide
    // Usage
    // License (multiple choice)
    {
        type: 'list',
        choices: ['MIT', 'GPL', 'GNU', 'Bsd-2-Clause'],
        name: 'license',
        message: 'What is your project license type?'
    }
    // Contributing
    // Tests
    // Questions
    // GitHub username
    // email address
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile('README.md', data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Success!');
        }
    });
}

// function to initialize program
function init() {
    inquirer
        .prompt(questions)
        .then(answers => {
            console.log("answers", answers);
            const markdown = generateMarkdown(answers);
            console.log("markdown", markdown);
            writeToFile('README.md', markdown)
        });
    
}

// function call to initialize program
init();