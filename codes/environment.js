class Environment {
	// creating an env with given record
	constructor(record = {}) {
		this.record = record;
	}
	// create a variable with given name and values
	define(name, value) {
		this.record[name] = value;
		return value;
	}
	// returns the value of a defined
	// variable or throws if its not defined
	lookup(name) {
		if (!this.record.hasOwnProperty(name)) {
			throw new ReferenceError(`Variable "${name}" is not defined.`);
		}
		return this.record[name];
	}
}

module.exports = Environment;
