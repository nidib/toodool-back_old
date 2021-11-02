/* eslint-disable max-len */

const SCHEMA = 'db';
const TABLES = {
	user: 'user',
	toodool: 'toodool',
	userInfo: 'user_info'
};
const userTable = `${SCHEMA}.${TABLES.user}`;
const toodoolTable = `${SCHEMA}.${TABLES.toodool}`;
const userInfoTable = `${SCHEMA}.${TABLES.userInfo}`;

const toodoolServicesQueryStrings = {
	createToodoolQueryString: `INSERT INTO ${toodoolTable} (title, description, user_id) VALUES ($1, $2, $3)`,
	selectToodoolByUserAndTitleQueryString: `SELECT id AS oid, title, description FROM ${toodoolTable} WHERE user_id = $1 AND title = $2`,
	completeToodoolQueryString: `UPDATE ${toodoolTable} SET completed = $1 WHERE user_id = $2 AND id = $3`,
	getToodolsByUserQueryString: `SELECT id AS oid, completed, title, description FROM ${toodoolTable} WHERE user_id = $1`,
	getToodoolByUserAndIdQueryString: `SELECT id as oid, completed, title, description FROM ${toodoolTable} WHERE user_id = $1 and id = $2`,
	updateToodoolQueryString: `UPDATE ${toodoolTable} SET completed = $1, title = $2, description = $3, updated_at = NOW() WHERE user_id = $4 AND id = $5`,
	deleteToodoolQueryString: `DELETE FROM ${toodoolTable} WHERE id = $1 AND user_id = $2`
};

const userInfoServicesQueryStrings = {
	createUserInfoQueryString: `INSERT INTO ${userInfoTable} (user_id) VALUES ($1)`,
	updateUserInfoQueryString: `UPDATE ${userInfoTable} SET email = $1, first_name = $2, last_name = $3, nickname = $4, updated_at = NOW() WHERE user_id = $5`
};

const userServicesQueryStrings = {
	selectUserByUsernameQueryString: `SELECT * FROM ${userTable} WHERE username = $1`,
	createUserQueryString: `INSERT INTO ${userTable} (username, password) VALUES ($1, $2) RETURNING id`,
	getUsernameWithInfo: `SELECT ${userTable}.username, ${TABLES.userInfo}.first_name AS "firstName", ${TABLES.userInfo}.last_name AS "lastName", ${TABLES.userInfo}.email, ${TABLES.userInfo}.nickname FROM ${userTable} INNER JOIN ${userInfoTable} ON ${userTable}.id = ${TABLES.userInfo}.user_id WHERE ${userTable}.id = $1`
};

module.exports = {
	toodoolServicesQueryStrings,
	userInfoServicesQueryStrings,
	userServicesQueryStrings
};