USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Manufacturing");
INSERT INTO department (name)
VALUES ("Software");
INSERT INTO department (name)
VALUES ("HR");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Manufacturing Lead", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("HR Head", 125000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rose", "Flower", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Maple", "Tree", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dense", "Forest", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rock", "Bolder", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rider", "Cruise", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Frank", "Bob", 1, null);