const assert = require("assert");

const Environment = require("./environment");

// Eva Interpreter
class Eva {
	// eva instance with global environment
	constructor(global = new Environment()) {
		this.global = global;
	}
	// to evaluate expressions
	eval(exp, env = this.global) {
		// -------------------------------
		// Primitives
		if (isNumber(exp)) {
			return exp;
		}
		if (isString(exp)) {
			return exp.slice(1, -1);
		}
		// -------------------------------
		// Math Operations
		if (exp[0] === "+") {
			return this.eval(exp[1], env) + this.eval(exp[2], env);
		}
		if (exp[0] === "*") {
			return this.eval(exp[1], env) * this.eval(exp[2], env);
		}
		if (exp[0] === "-") {
			return this.eval(exp[1], env) - this.eval(exp[2], env);
		}
		if (exp[0] === "/") {
			return this.eval(exp[1], env) / this.eval(exp[2], env);
		}
		// -------------------------------
		// Comparators
		if (exp[0] === ">") {
			return this.eval(exp[1], env) > this.eval(exp[2], env);
		}
		if (exp[0] === "<") {
			return this.eval(exp[1], env) < this.eval(exp[2], env);
		}
		if (exp[0] === ">=") {
			return this.eval(exp[1], env) >= this.eval(exp[2], env);
		}
		if (exp[0] === "<=") {
			return this.eval(exp[1], env) <= this.eval(exp[2], env);
		}
		if (exp[0] === "=") {
			return this.eval(exp[1], env) === this.eval(exp[2], env);
		}
		// -------------------------------
		// Variable declaration
		if (exp[0] === "var") {
			const [_, name, value] = exp;
			return env.define(name, this.eval(value, env));
		}
		// -------------------------------
		// Variable update
		if (exp[0] === "set") {
			const [_, name, value] = exp;
			return env.assign(name, this.eval(value, env));
		}
		// -------------------------------
		// Variable access
		if (isVariableName(exp)) {
			return env.lookup(exp);
		}
		// ------------------------------
		// If expression
		if (exp[0] === "if") {
			const [_tag, condition, consequent, alternate] = exp;
			if (this.eval(condition, env)) {
				return this.eval(consequent, env);
			}
			return this.eval(alternate, env);
		}
		// -------------------------------
		// while expression
		if (exp[0] === "while") {
			const [_tag, condition, body] = exp;
			let result;
			while (this.eval(condition, env)) {
				result = this.eval(body, env);
			}
			return result;
		}
		// -------------------------------
		// Block: sequence of expressions
		if (exp[0] === "begin") {
			const blockEnv = new Environment({}, env);
			return this._evalBlock(exp, blockEnv);
		}
		// -------------------------------
		// Failed / Unimplemented
		throw `Unimplemented: ${JSON.stringify(exp)}`;
	}

	_evalBlock(block, env) {
		let result;

		const [_tag, ...expressions] = block;

		expressions.forEach((exp) => {
			result = this.eval(exp, env);
		});

		return result;
	}
}

function isNumber(exp) {
	return typeof exp === "number";
}

function isString(exp) {
	return typeof exp === "string" && exp.startsWith('"') && exp.endsWith('"');
}

function isVariableName(exp) {
	return typeof exp === "string" && /^[a-zA-Z]\w*$/.test(exp);
}

module.exports = Eva;
