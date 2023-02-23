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
        message: 'You can enter the installation instructions here.'
    },
    // Usage
    {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions and examples for use.'
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
    },
    // License (multiple choice)
    {
        type: 'list',
        choices: ['MIT', 'ISC', 'GNU', 'Bsd-2-Clause'],
        name: 'license',
        message: 'What is your project license type?'
    },
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
            licenseNotice(answers)
            console.log("answers", answers);
            console.log(answers.license)
            const markdown = generateMarkdown(answers);
            writeToFile('README.md', markdown)
            license(answers)
        })
} 
// const mitData= "license info"
const license = function (data) {
    if (data.license ==="MIT") {
        writeToFile('README.md', `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`);
    } if (data.license = "ISC") {
        writeToFile('README.md', `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`);
    } if (data.license === "GNU") {
        writeToFile('README.md', `[![[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`)
    } if (data.license === "Bsd-2-Clause") {
        writeToFile('README.md', `[![License: Bsd-2-Clause]([![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`);
    }
}
const licenseNotice = function (data) {
    if (data.license === "MIT") {
        data.license = data.license + " Mit license info"
        console.log("Hello")
    } if (data.license === "ISC") {
        data.license = data.license + " ISC license info"
    } if (data.license === "GNU") {
        data.license = data.license + " GNU license info"
    } if (data.license === "Bsd-2-Clause") {
        data.license = data.license + " Bsd-2-Clause license info"
    }
}

// function call to initialize program
init();
