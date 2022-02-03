const mysql = require('mysql2');
// const express = require("express");
const inquirer = require("inquirer");
// const { listenerCount } = require('mysql2/typings/mysql/lib/Connection');
// const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
});

const viewDepartments = () => {
    db.query(`SELECT * FROM departments`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        viewTables();
    });
}

const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        viewTables();
    });
}

const viewEmployees = () => {
    const query = 
    `
SELECT
employees.id,
employees.first_name,
employees.last_name,
roles.title,
roles.department_id,
roles.salary,
employees.manager_id
FROM employees
INNER JOIN roles ON roles.id = employees.role_id
INNER JOIN departments ON departments.id = roles.department_id;
    `
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        viewTables();
    });
}

const viewTables = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View departments", "View roles", "View employees", "Exit"],
            name: "choice"
        }
    ]).then((response) => {
        if (response.choice === "View departments") {
            viewDepartments();
        }
        if (response.choice === "View roles") {
            viewRoles();
        }
        if (response.choice === "View employees") {
            viewEmployees();
        }
        if (response.choice === "Exit") {
            process.exit(0);
        }
    });
}

console.log("Welcome to the Employee Tracker!");
viewTables();