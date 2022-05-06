//packages using for this project
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
        ]).then (function(res){
            switch(res.start){
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addADepartment();
                    break;
                case 'Add a role':
                    addARole();
                    break;
                case 'Add an employee':
                    addAnEmployee();
                    break;
                case 'update an employee':
                    updateAnEmployee();
                    break;
            }
        })
};


function viewAllDepartments(){
    connection.query('SELECT * FROM department', function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};
function viewAllRoles(){
    connection.query('SELECT title, role_id, department_name, salary FROM role INNER JOIN department ON role.department_id = department.id ', function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};
function viewAllEmployees(){
};
function addADepartment(){
};
function addARole(){
};
function addAnEmployee(){
};
function updateAnEmployee(){
};
start();


