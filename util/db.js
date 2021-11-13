const mysql = require('mysql2/promise');

/**
 * @param {string} query SQL statement to run
 * @param {string[]} params parameters to pass into prepared statement
 * @param {boolean} printResults whether we should print the results, or just return them
 * @returns
 */
async function runQuery(query, params = [], printResults = true) {
	const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'test123',
		database: 'CMS'
	});

	const [rows] = await connection.execute(query, params);

	connection.end();

	if (printResults) {
		console.log();
		console.table(rows);
		console.log();
	}

	return rows;
}

module.exports = { runQuery };
