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
        message: 'Please enter your project description'
    },
    // Installation guide 
    {
        type: 'list',
        choices: ['yes', 'no'], //choices yes/no no removes installation, yes allows user to enter
        name: 'installation',
        message: 'Are there any installation instructions for your project?'
    },
    {
        type: 'input',
        name: 'installationInput',
        message: 'You can enter the instructions here.'
    },
    // Usage
    {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions and examples for use.'
    },
    // License (multiple choice)
    {
        type: 'list',
        choices: ['MIT', 'ISC', 'GNU', 'Bsd-2-Clause'],
        name: 'license',
        message: 'What is your project license type?'
    },
    // Contributing
    {
        type: 'input',
        name: 'contributing',
        message: 'Enter any project contributors you wish to mention.'
    },
    // Tests
    {
        type: 'input',
        name: 'tests',
        message: 'Write tests for your application. Then provide examples on how to run them here.'
    },
    // // Questions
    // {
    //     type: 'list',
    //     choices: ['yes', 'no'], //choice yes no
    //     name: 'questions',
    //     message: 'Are there any questions remaining regarding the project?'
    // },
    // GitHub username
    {
        type: 'input',
        name: 'username',
        message: 'Please enter your Github username'
    },
    // email address
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email address'
    }
];

//if (answers.installation==='no') {
//generateInstallation() to remove installation from readme 
//anotherFunction() that removes installationInput object
//questions.name.installationInput = " "
//questions.message.installationInput = " "
//}
// } else {
// // dont show input version of question, remove question title 
// //}
// }

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
            console.log(answers.license)
            const markdown = generateMarkdown(answers);
            writeToFile('README.md', markdown)
            //add badge to license
                if (answers.license === 'MIT') {
                    console.log("license clicked")
                    writeToFile('README.md', `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`);
                } if (answers.license === 'ISC') {
                    writeToFile('README.md', `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`);
                } if (answers.license === 'GNU') {
                    writeToFile('README.md', `[![[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`);
                } if (answers.license === 'Bsd-2-Clause') {
                    writeToFile('README.md', `[![License: Bsd-2-Clause]([![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`);
                
            }
        })
}

// function call to initialize program
init();

// When a user chooses a license for their application from a list of options 
//then a badge for that license is added near the top of the README and a notice
// is added to the section of the README entitled License that explains which license 
//the application is covered under
