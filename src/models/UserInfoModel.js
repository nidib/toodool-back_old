class UserInfoModel {
	constructor(obj) {
		this.id = obj.id || null;
		this.userId = obj.userId || null;
		this.email = obj.email || null;
		this.firstName = obj.firstName || null;
		this.lastName = obj.lastName || null;
		this.nickname = obj.nickname || null;
	}

	getUserId() {
		return this.userId;
	}

	getId() {
		return this.id;
	}

	getEmail() {
		return this.email;
	}

	setEmail(email) {
		this.email = email;
	}

	getFirstName() {
		return this.firstName;
	}

	setFirstName(firstName) {
		this.firstName = firstName;
	}

	getLastName() {
		return this.lastName;
	}

	setLastName(lastName) {
		this.lastName = lastName;
	}

	getNickname() {
		return this.nickname;
	}

	setNickname(nickname) {
		this.nickname = nickname;
	}
}

module.exports = UserInfoModel;