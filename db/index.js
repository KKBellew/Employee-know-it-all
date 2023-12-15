const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require(".");
require("console.table");

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


async function acquireUsersBasic(firstName,lastName)
{
	var retArr = [];
	try
	{
		//Select the id and first and last name for all employees in the employee table.
		var sql = "SELECT id, first_name, last_name FROM employee"
		const [rows, fields] = await connection.execute(sql);

		
		if (rows) {
      // push an object containing name, value fields to the return array.
      rows.forEach((row) => {
        // normalize the first/last name by trimming and lowercasing them.
        var rowFirstName = row.first_name.trim().toLowerCase();
        var rowLastName = row.last_name.trim().toLowerCase();
    
        var canAdd = true;
    
        if (firstName && lastName) {
          // Normalize the function inputs first/last names
          var firstNameLCT = firstName.trim().toLowerCase();
          var lastNameLCT = lastName.trim().toLowerCase();
    
          if (rowFirstName === firstNameLCT && rowLastName === lastNameLCT) canAdd = false;
        }
    
        if (canAdd) {
          retArr.push({ firstName: rowFirstName, lastName: rowLastName });
        }
      });
    }
	}
	catch(err){}
	
	return retArr;
}

async function acquireRolesBasic()
{
	var retArr = []; //Create an array to hold employee roles that will be displayed by inquirer
	try
	{
		//Select the ID and title for all of the roles
		var sql = "SELECT id,title FROM role"
		
		//Execute the query and awit the results
		const [rows, fields] = await connection.execute(sql);
		if(rows)
		{
			//for each row returned by the sql query, add an object containing the name, value fields needed by inquirer to display the data in the list correctly.
			//According to inquirer documentation name should be displayed and value should be what you get as the answer/return when the item is selected
			rows.forEach((row)=>{
				//Add the item to the return array
				retArr.push(
					{
						name : row.title,
						value : row.id
					}
				);
			});
		}
	}
	catch(err){}
	
	return retArr;
}

async function acquireManagersBasic()
{
	var retArr = []; //Create an array to hold employee roles that will be displayed by inquirer
	try
	{
		//Select the ID and title for all of the roles
		var sql = "SELECT id,title FROM role"
		
		//Execute the query and awit the results
		const [rows, fields] = await connection.execute(sql);
		if(rows)
		{
			//for each row returned by the sql query, add an object containing the name, value fields needed by inquirer to display the data in the list correctly.
			//According to inquirer documentation name should be displayed and value should be what you get as the answer/return when the item is selected
			rows.forEach((row)=>{
				//Add the item to the return array
				retArr.push(
					{
						name : row.title,
						value : row.id
					}
				);
			});
		}
	}
	catch(err){}
	
	return retArr;
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

function addEmployee() {
	//Acquire basic role information to be used in selecting the user role
	var roles = acquireRolesBasic();
	var managers = acquireUsersBasic();  

  inquirer
    .prompt([
      {
        type: "input",
        name: "",
        message: "Enter new employees first name:",
      },
	  {
        type: "input",
        name: "lastname",
        message: "Enter new employees last name:",
      },
      {
        type: "list",
        name: "role",
        message: "User Role?",
        choices: roles,
      },
      {
        type: "list",
        name: "manager",
        message: "Manager?",
        choices: managers,
      }
    ])
    .then((answers) => {
      connection.query(
		//Insert into the employee table only if the employee does not exist.
        "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?) WHERE NOT EXISTS(SELECT NULL FROM employee WHERE first_name = ? AND last_name = ?)",
        //When using multiple inputs pass in as an array like seen below. Make sure to pass in, in the order seen in query.
		[answers.firstname, answers.lastname, answers.role, answers.manager, answers.firstname.trim(), answers.lastname.trim()],
        (err, result) => {
          if (err) throw err;

          console.log(`\n${result.affectedRows} employee added!\n`); 
          mainMenu();
        }
      );
    });
}

function updatedEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the updated employee role:",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee role ?",
        answer,
        (err, result) => {
          if (err) throw err;

          console.log(`\n${result.affectedRows} updated employee role!\n`); 
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