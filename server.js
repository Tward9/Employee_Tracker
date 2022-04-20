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
        database: 'company_db'
    },
    console.log(`Connected to the ___ database.`)
);

const questions = [
    {
        type: 'list',
        name: 'doWhat',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Update an Employee Manager', 'Finish'],
    },
    {
        type: 'input',
        name: 'addDepartment',
        message: 'What is the name of the New Department',
        when(answers) {
            return answers.doWhat === 'Add a Department'
        },
    },
    {
        type: 'input',
        name: 'addRoleName',
        message: 'What is the Name of the new Role',
        when(answers) {
            return answers.doWhat === 'Add a Role'
        },
    },
    {
        type: 'input',
        name: 'addRoleSalary',
        message: 'What is the Salary of the new Role',
        when(answers) {
            return answers.doWhat === 'Add a Role'
        },
    },
    {
        type: 'input',
        name: 'addRoleDepartment',
        message: 'What is the Department of the new Role',
        when(answers) {
            return answers.doWhat === 'Add a Role'
        },
    },
    {
        type: 'input',
        name: 'addEmployeeFname',
        message: 'What is the First Name of the new Employee',
        when(answers) {
            return answers.doWhat === 'Add an Employee'
        },
    },
    {
        type: 'input',
        name: 'addEmployeeLname',
        message: 'What is the Last Name of the new Employee',
        when(answers) {
            return answers.doWhat === 'Add an Employee'
        },
    },
    {
        type: 'input',
        name: 'addEmployeeRole',
        message: 'What is the Role of the new Employee',
        when(answers) {
            return answers.doWhat === 'Add an Employee'
        },
    },
    {
        type: 'input',
        name: 'addEmployeeManager',
        message: 'Who is the Manager of the new Employee, select null for no manager',
        default: null,
        when(answers) {
            return answers.doWhat === 'Add an Employee'
        },
    },
    {
        type: 'input',
        name: 'updateEmployee',
        message: 'What is the ID of the Employee being updated',
        when(answers) {
            return answers.doWhat === 'Update an Employee Role'
        },
    },
    {
        type: 'input',
        name: 'updateEmployeeRole',
        message: 'What is the ID of the new role of the Employee',
        when(answers) {
            return answers.doWhat === 'Update an Employee Role'
        },
    },
    {
        type: 'input',
        name: 'updateManagerofEmployeeID',
        message: 'What is the ID of the Employee being updated',
        when(answers) {
            return answers.doWhat === 'Update an Employee Manager'
        },
    },
    {
        type: 'input',
        name: 'updateEmployeeManager',
        message: 'What is the ID of the new manager of the Employee',
        when(answers) {
            return answers.doWhat === 'Update an Employee Manager'
        },
    },
];

function manageBuisness() {
    inquirer.prompt(questions).then((answers) => {
        if (answers.doWhat === 'View all Departments') {
            //query to see table of departments
            db.query('SELECT * FROM department', function (err, results) {
                console.log('');
                console.table(results);
            });
            //then
            manageBuisness();
        } else if (answers.doWhat === 'View all Roles') {
            //query to see table of roles
            db.query('SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON department.id = role.department_id', function (err, results) {
                console.log('');
                console.table(results);
            });
            //then
            manageBuisness();
        } else if (answers.doWhat === 'View all Employees') {
            //query to see table of employees
            db.query('SELECT employee.Id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON role.id = employee.role_id', function (err, results) {
                console.log('');
                console.table(results);
            });
            //then
            manageBuisness();
        } else if (answers.doWhat === 'Add a Department') {
            //something
            db.query(`INSERT INTO department (department_name) VALUES ('${answers.addDepartment}')`, function (err, results) {
                console.log('');
                console.log('Adding New Department');
            });
            db.query('SELECT * FROM department', function (err, results) {
                console.log('');
                console.table(results);
            });
            //then
            manageBuisness();
        } else if (answers.doWhat === 'Add a Role') {
            //something
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.addRoleName}', ${answers.addRoleSalary}, ${answers.addRoleDepartment})`, function (err, results) {
                console.log('');
                console.log('Adding New Department');
            });
            db.query('SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON department.id = role.department_id', function (err, results) {
                console.log('');
                console.table(results);
            });
            //then
            manageBuisness();
        } else if (answers.doWhat === 'Add an Employee') {
            //something
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.addEmployeeFname}', '${answers.addEmployeeLname}', ${answers.addEmployeeRole}, ${answers.addEmployeeManager})`, function (err, results) {
                console.log('');
                console.log('Adding New Department');
            });
            db.query('SELECT employee.Id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON role.id = employee.role_id', function (err, results) {
                console.log('');
                console.table(results);
            });
            //then
            manageBuisness();
        } else if (answers.doWhat === 'Update an Employee Role') {
            //something
            db.query(`UPDATE employee SET role_id = '${answers.updateEmployeeManager}' WHERE id = '${answers.updateManagerofEmployeeID}'`, function (err, results) {
                console.log('');
                console.log(`Employee ID: ${answers.updateManagerofEmployeeID} has been updated with new Manager ID: ${answers.updateEmployeeManager}`);
            });
            db.query('SELECT employee.Id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON role.id = employee.role_id', function (err, results) {
                console.log('');
                console.table(results);
            });
            //then
            manageBuisness();
        }else if (answers.doWhat === 'Update an Employee Manager') {
            //something
            db.query(`UPDATE employee SET manager_id = '${answers.updateEmployeeRole}' WHERE id = '${answers.updateEmployee}'`, function (err, results) {
                console.log('');
                console.log(`Employee ID: ${answers.updateEmployee} has been updated to Role ID: ${answers.updateEmployeeRole}`);
            });
            db.query('SELECT employee.Id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee employee LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id JOIN role ON role.id = employee.role_id', function (err, results) {
                console.log('');
                console.table(results);
            });
            //then
            manageBuisness();
        }else {
            //Stop program
            console.log('Edit Complete');
            process.exit(1);
        };
    });
};
manageBuisness();