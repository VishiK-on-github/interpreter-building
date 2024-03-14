class Environment {
	// creating an env with given record
	constructor(record = {}, parent = null) {
		this.record = record;
		this.parent = parent;
	}
	// create a variable with given name and values
	define(name, value) {
		this.record[name] = value;
		return value;
	}
	// updating existing variable value
	assign(name, value) {
		this.resolve(name).record[name] = value;
		return value;
	}
	// returns the value of a defined
	// variable or throws if its not defined
	lookup(name) {
		return this.resolve(name).record[name];
	}
	// performs lookup in parent env hierarchy to find variable
	resolve(name) {
		if (this.record.hasOwnProperty(name)) {
			return this;
		}
		if (this.parent == null) {
			throw new ReferenceError(`Variable "${name}" is not defined.`);
		}
		return this.parent.resolve(name);
	}
}

module.exports = Environment;
