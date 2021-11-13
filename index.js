const inquirer = require('inquirer');

const {
	addDepartment,
	addEmployee,
	addRole,
	updateEmployeeRole,
	viewAllDepartments,
	viewAllEmployees,
	viewAllRoles,
	getRoles,
	getManagers,
	getEmployees,
	getDepartments
} = require('./util/functions');

async function init() {
	let keepGoing = true;

	while (keepGoing) {
		let employees = await getEmployees();
		let managers = await getManagers();
		let roles = await getRoles();
		let departments = await getDepartments();

		await inquirer
			.prompt([
				{
					type: 'list',
					message: 'What would you like to do today?',
					name: 'action',
					choices: [
						new inquirer.Separator(),
						'View All Employees',
						'View All Departments',
						'View All Roles',
						new inquirer.Separator(),
						'Add Department',
						'Add Role',
						'Add Employee',
						new inquirer.Separator(),
						'Update Employee Role',
						new inquirer.Separator(),
						'Exit'
					]
				}
			])
			.then(async answers => {
				switch (answers.action) {
					case 'View All Employees':
						await viewAllEmployees();
						break;
					case 'View All Departments':
						await viewAllDepartments();
						break;
					case 'View All Roles':
						await viewAllRoles();
						break;
					case 'Add Department':
						const newDepartment = await inquirer.prompt([
							{
								name: 'department',
								message: "What's the new department's name? ",
								type: 'input'
							}
						]);

						await addDepartment(newDepartment);
						break;
					case 'Add Role':
						const newRole = await inquirer.prompt([
							{
								name: 'title',
								message: 'What is the new role? ',
								type: 'input'
							},
							{
								name: 'salary',
								message: 'How much does this role pay? ',
								type: 'number'
							},
							{
								name: 'departmentID',
								message: 'What department is this role under? ',
								type: 'list',
								choices: departments
							}
						]);

						addRole(newRole);
						break;
					case 'Add Employee':
						const newEmployee = await inquirer.prompt([
							{
								name: 'firstName',
								type: 'input',
								message: 'First name: '
							},
							{
								name: 'lastName',
								type: 'input',
								message: 'Last name: '
							},
							{
								name: 'roleID',
								type: 'list',
								message: "What is the employee's role? ",
								choices: roles
							},
							{
								name: 'managerID',
								type: 'list',
								message: "Who is the employee's manager? ",
								choices: managers
							}
						]);

						await addEmployee(newEmployee);
						break;
					case 'Update Employee Role':
						const patch = await inquirer.prompt([
							{
								name: 'employeeID',
								type: 'list',
								message: "Which employee's role would you like to update?",
								choices: employees
							},
							{
								name: 'newRoleID',
								type: 'list',
								message: "What is this employee's new role?",
								choices: roles
							}
						]);

						await updateEmployeeRole(patch);
						break;
					default:
						keepGoing = false;
						break;
				}
			});
	}
}

init();
