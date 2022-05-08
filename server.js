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
// starts the node application
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

//Displays a list of the departments
function viewAllDepartments(){
    connection.query('SELECT * FROM department', function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};
//Displays a list of all the roles
function viewAllRoles(){
    connection.query('SELECT title, role_id, department_name, salary FROM role INNER JOIN department ON role.department_id = department.id', function(err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};
//Displays a list of all the employees with the desired columns displayed
function viewAllEmployees(){
    connection.query('SELECT employee_id, first_name, last_name, title, department_name, salary FROM employee INNER JOIN role ON employee.role_id = role.role_id INNER JOIN department ON role.department_id = department.id', function (err, res){
        if(err) throw err;
        console.table(res);
        start();
    })
};
//Uses an INSERT INTO statement to add new departments
function addADepartment(){
    inquirer
        .prompt([
            {
            name: 'department',
            type: 'input',
            message: 'What department would you like to add?'
            }
        ]).then(function(answer){
            connection.query(
                "INSERT INTO department VALUES (DEFAULT, ?)",
                [answer.department],
                function(err){
                    if(err) throw err;
                    console.log('Departments updated with '+ answer.department);
                    start();
                }
            )
        })
};
//adds a new role
function addARole(){
    inquirer
        .prompt([
            {
                name: 'role',
                type: 'input',
                message: 'What role would you like to add?'
            },
            {
                name: 'salary',
                type: 'number',
                message: 'Enter Salary',
                validate: function(value){
                    if(isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            },
            {
                name: 'department_id',
                type: 'number',
                message: 'Enter department_id',
                validate: function(value){
                    if(isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer){
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.role,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                function(err){
                    if(err) throw err;
                    console.log('New role added named '+ answer.role);
                    start();
                }
            )
        })

};
function addAnEmployee(){
};
function updateAnEmployee(){
};
start();


