DROP DATABASE IF EXISTS CMS;

CREATE DATABASE CMS;

USE CMS;

CREATE TABLE Department (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	department_name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE Role (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(30) NOT NULL UNIQUE,
	salary DECIMAL NOT NULL,
	department_id INT NOT NULL,
	FOREIGN KEY (department_id) REFERENCES Department(id)
);

CREATE TABLE Employee (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT NOT NULL,
	manager_id INT,
	FOREIGN KEY (role_id) REFERENCES Role(id),
	FOREIGN KEY (manager_id) REFERENCES Employee(id)
);

INSERT INTO
	Department (department_name)
VALUES
	("Sales"),
	("IT"),
	("Marketing"),
	("HR");

INSERT INTO
	Role (title, salary, department_id)
VALUES
	("Sales Manager", 100000, 1),
	("HR Manager", 100000, 4),
	("IT Manager", 100000, 2),
	("Salesperson", 50000, 1),
	("Engineer", 900000, 2),
	("Mascot Manager", 30000, 3),
	("Counselor", 80000, 4);

INSERT INTO
	Employee (first_name, last_name, role_id, manager_id)
VALUES
	("Augie", "Chung", 3, NULL),
	("Jane", "Doe", 2, NULL),
	("Will", "Smith", 5, 1),
	("Krushil", "Naik", 5, 1),
	("John", "Doe", 1, 2);
