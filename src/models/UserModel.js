class UserModel {
	constructor({ id, username, password }) {
		this.id = id;
		this.username = username;
		this.password = password;
	}

	getId() {
		return this.id;
	}

	getUsername() {
		return this.username;
	}

	setUsername(username) {
		this.username = username;
	}

	getPassword() {
		return this.password;
	}

	setPassword(password) {
		this.password = password;
	}
}

module.exports = UserModel;