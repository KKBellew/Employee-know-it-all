const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

// package promt for user input
const inquirer = require("inquirer");

// Display options using inquirer
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
        // Handle other cases similarly
        case "Exit":
          connection.end();
          console.log("Goodbye!");
          break;
      }
    });
}
