class ToodoolModel {
	constructor(obj) {
		this.id = obj.id;
		this.completed = obj.completed;
		this.title = obj.title;
		this.description = obj.description;
		this.userId = obj.userId;
	}

	getId() {
		return this.id;
	}

	getUserId() {
		return this.userId;
	}

	getCompleted() {
		return this.completed;
	}

	setCompleted(completed) {
		this.completed = completed;
	}

	getTitle() {
		return this.title;
	}

	setTitle(title) {
		this.title = title;
	}

	getDescription() {
		return this.description;
	}

	setDescription(description) {
		this.description = description;
	}
}

module.exports = ToodoolModel;