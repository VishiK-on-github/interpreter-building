const assert = require("assert");

const Environment = require("./environment");

// Eva Interpreter
class Eva {
	// eva instance with global environment
	constructor(global = GlobalEnvironment) {
		this.global = global;
	}
	// to evaluate expressions
	eval(exp, env = this.global) {
		// Primitives
		if (this._isNumber(exp)) {
			return exp;
		}
		if (this._isString(exp)) {
			return exp.slice(1, -1);
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
		if (this._isVariableName(exp)) {
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
		// Function call
		if (Array.isArray(exp)) {
			const fn = this.eval(exp[0], env);

			const args = exp.slice(1).map((arg) => this.eval(arg, env));

			// 1. native fns
			if (typeof fn === "function") {
				return fn(...args);
			}
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

	_isNumber(exp) {
		return typeof exp === "number";
	}

	_isString(exp) {
		return typeof exp === "string" && exp.startsWith('"') && exp.endsWith('"');
	}

	_isVariableName(exp) {
		return typeof exp === "string" && /^[+\-*/<>=a-zA-Z0-9_]*$/.test(exp);
	}
}

const GlobalEnvironment = new Environment({
	null: null,

	true: true,
	false: false,

	VERSION: "0.1",

	"+"(op1, op2) {
		return op1 + op2;
	},
	"*"(op1, op2) {
		return op1 * op2;
	},
	"-"(op1, op2 = null) {
		if (op2 == null) {
			return -op1;
		}
		return op1 - op2;
	},
	"/"(op1, op2) {
		return op1 / op2;
	},
	">"(op1, op2) {
		return op1 > op2;
	},
	"<"(op1, op2) {
		return op1 < op2;
	},
	">="(op1, op2) {
		return op1 >= op2;
	},
	"<="(op1, op2) {
		return op1 <= op2;
	},
	"="(op1, op2) {
		return op1 === op2;
	},
	// console output
	print(...args) {
		console.log(...args);
	},
});

module.exports = Eva;
