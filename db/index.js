const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require(".");
require("consol.table");

//functins for adding, viewing, and updating go here
function viewDepartments() {
  connection.query("SELECT * FROM department", (err, departments) => {
    if (err) throw err;

    console.log("\nAll Departments:\n");
    console.table(departments);

    mainMenu();
  });
}

// Function to view all roles
function viewRoles() {
  connection.query("SELECT * FROM role", (err, roles) => {
    if (err) throw err;

    console.log("\nAll Roles:\n");
    console.table(roles);

    mainMenu();
  });
}

// Function to view all employees
function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, employees) => {
    if (err) throw err;

    console.log("\nAll Employees:\n");
    console.table(employees);

    mainMenu();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the new department:",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        answer,
        (err, result) => {
          if (err) throw err;

          console.log(`\n${result.affectedRows} department added!\n`);

          mainMenu();
        }
      );
    });
}

// Display options in terminal
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      // Call the appropriate function based on the user's answers
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          console.log("See ya later!");
          break;
      }
    });
}

//go back to the main menu
mainMenu();
