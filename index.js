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
        choices: ['yes', 'no'], //choices yes/no= no removes installation, yes allows user to enter
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
        message: 'Provide instructions and examples for use for your project.'
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
    // GitHub username
    {
        type: 'input',
        name: 'username',
        message: 'Please enter your Github username'
    },
    // Email address
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
            console.log("one",answers.license) //"MIT"/ "GNU" etc 
            license(answers)
            console.log("two",answers.license)// notice
            const markdown = generateMarkdown(answers);
            writeToFile('README.md', markdown)
        })
} 

//function to add license badge and license notice to readme
const license = function (data) {
    if (data.license ==="MIT") {
        writeToFile('README.md', `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`);
        data.license = `Mit license. Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to conditions.`
    } if (data.license === "ISC") {
        writeToFile('README.md', `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`);
        data.license = `ISC license. Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.`;
    } if (data.license === "GNU") {
        writeToFile('README.md', `[![[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`);
        data.license = `GNU license. The GNU General Public License is a free, copyleft license for software and other kinds of works.`;
    } if (data.license === "Bsd-2-Clause") {
        writeToFile('README.md', `[![License: Bsd-2-Clause]([![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`);
        data.license =`Bsd-2-Clause license. Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

        1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
        
        2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
        
        3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.`;
    }
}


// function call to initialize program
init();
