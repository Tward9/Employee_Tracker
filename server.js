// Import Express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import Inquirer
const inquirer = require('inquirer');
// Import Table Package
const cTable = require('console.table');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password
        password: 'rootPassword',
        database: ''
    },
    console.log(`Connected to the ___ database.`)
);

const questions = [
    {
        type: 'list',
        name: 'doWhat',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Finish'],
    }
];

function manageBuisness(){
    inquirer.prompt(questions).then((answers) => {
        if (answers.doWhat === 'View all Departments') {
            //something

            //then
            manageBuisness();
        }else if (answers.doWhat === 'View all Roles') {
            //something
            
            //then
            manageBuisness();
        }else if (answers.doWhat === 'View all Employees') {
            //something

            //then
            manageBuisness();
        }else if (answers.doWhat === 'Add a Department') {
            //something

            //then
            manageBuisness();
        }else if (answers.doWhat === 'Add a Role') {
            //something

            //then
            manageBuisness();
        }else if (answers.doWhat === 'Add an Employee') {
            //something
            
            //then
            manageBuisness();
        }else if (answers.doWhat === 'Update an Employee Role') {
            //something

            //then
            manageBuisness();
        }else {
            //Stop program
        };
    });
};