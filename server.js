//packages using for this project
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTables = require('console.table');

//basic way to connect the application to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1234',
    database: 'employee_db'
  },
    console.log('Connected to the employee_db database.')
  );

function start(){
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'start',
                message: "What would you like to do?",
                choices: 
                ['View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role']
            }
        ])
};
start();
