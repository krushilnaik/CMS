require('console.table');

const { runQuery } = require('./db');

module.exports = {
	/**
	 * View all established departments
	 */
	async viewAllDepartments() {
		const query = `/* SQL */
			SELECT
				id, department_name as department
			FROM Department;
		`;

		await runQuery(query);
	},

	/**
	 * View all roles
	 */
	async viewAllRoles() {
		const query = `/* SQL */
			SELECT
				r.id, r.title,
				d.department_name as department,
				r.salary
			FROM
				Role r JOIN Department d ON r.department_id = d.id;
		`;

		await runQuery(query);
	},

	/**
	 * An inquirer helper function to get all managers
	 */
	async getManagers() {
		const query = `/* SQL */
			SELECT
				id as value,
				CONCAT_WS(" ", first_name, last_name) as name
			FROM
				Employee
			WHERE
				manager_id IS NULL;
		`;

		const managers = await runQuery(query, null, false);

		return managers;
	},

	/**
	 * An inquirer helper function to get all employees
	 */
	async getEmployees() {
		const query = `/* SQL */
			SELECT
				id as value,
				CONCAT_WS(" ", first_name, last_name) as name
			FROM
				Employee
		`;

		const employees = await runQuery(query, null, false);

		return employees;
	},

	/**
	 * An inquirer helper function to get all roles
	 */
	async getRoles() {
		const query = `/* SQL */
			SELECT
				id as value,
				title as name
			FROM
				Role;
		`;

		const roles = await runQuery(query, null, false);

		return roles;
	},

	/**
	 * An inquirer helper function to get all departments
	 */
	async getDepartments() {
		const query = `/* SQL */
			SELECT
				id as value,
				department_name as name
			FROM Department;
		`;

		const departments = await runQuery(query, null, false);

		return departments;
	},

	/**
	 * View all employees
	 */
	async viewAllEmployees() {
		const query = `/* SQL */
			SELECT
				e.id, e.first_name, e.last_name,
				r.title,
				d.department_name AS department,
				r.salary,
				CONCAT_WS(' ', COALESCE(m.first_name, "null"), m.last_name) AS manager
			FROM
				Employee e
				JOIN Role r ON e.role_id = r.id
				JOIN Department d ON r.department_id = d.id
				LEFT JOIN Employee m ON e.manager_id = m.id;
		`;

		await runQuery(query);
	},

	/**
	 * Add a new department
	 */
	async addDepartment({ department }) {
		const query = `/* SQL */
			INSERT INTO
				Department (department_name)
			VALUES
				(?)
		`;

		await runQuery(query, [department]);
	},

	/**
	 * Add a new paid position
	 */
	async addRole({ title, salary, departmentID }) {
		const query = `/* SQL */
			INSERT INTO
				Role (title, salary, department_id)
			VALUES
				(?, ?, ?)
		`;

		await runQuery(query, [title, salary, departmentID]);
	},

	/**
	 * Add a new employee
	 */
	async addEmployee({ firstName, lastName, roleID, managerID }) {
		const query = `/* SQL */
			INSERT INTO
				Employee (first_name, last_name, role_id, manager_id)
			VALUES
				(?, ?, ?, ?);
		`;

		await runQuery(query, [firstName, lastName, roleID, managerID]);
	},

	/**
	 * Change an employee's position
	 */
	async updateEmployeeRole({ employeeID, newRoleID }) {
		const query = `/* SQL */
			UPDATE Employee
			SET role_id = ?
			WHERE id = ?;
		`;

		await runQuery(query, [employeeID, newRoleID]);
	}
};
