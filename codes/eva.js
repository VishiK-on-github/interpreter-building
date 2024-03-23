const assert = require("assert");

const Environment = require("./environment");
const Transformer = require("./transformer");

// Eva Interpreter
class Eva {
	// eva instance with global environment
	constructor(global = GlobalEnvironment) {
		this.global = global;
		this._transformer = new Transformer();
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
		// function declaration
		if (exp[0] === "def") {
			// jit-transpile to a variable declaration
			const varExp = this._transformer.transformDefToLambda(exp);
			return this.eval(varExp, env);
		}
		// -------------------------------
		// switch-exp
		if (exp[0] === "switch") {
			const ifExp = this._transformer.transformSwitchToIf(exp);
			return this.eval(ifExp, env);
		}
		// -------------------------------
		// for loop
		if (exp[0] === "for") {
			const whileExp = this._transformer.transformForToWhile(exp);
			return this.eval(whileExp, env);
		}
		// -------------------------------
		// increment
		if (exp[0] === "++") {
			const incExp = this._transformer.transformIncToSet(exp);
			return this.eval(incExp, env);
		}
		// -------------------------------
		// decrement
		if (exp[0] === "--") {
			const decExp = this._transformer.transformDecToSet(exp);
			return this.eval(decExp, env);
		}
		// -------------------------------
		// +=
		if (exp[0] === "+=") {
			const incExp = this._transformer.transformIncValToSet(exp);
			return this.eval(incExp, env);
		}
		// -------------------------------
		// -=
		if (exp[0] === "-=") {
			const decExp = this._transformer.transformDecValToSet(exp);
			return this.eval(decExp, env);
		}
		// -------------------------------
		// lambda fns
		if (exp[0] === "lambda") {
			const [_tag, params, body] = exp;

			return {
				params,
				body,
				env,
			};
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

			// 2. user-defined
			const activationRecord = {};

			fn.params.forEach((param, index) => {
				activationRecord[param] = args[index];
			});

			const activationEnv = new Environment(activationRecord, fn.env);

			return this._evalBody(fn.body, activationEnv);
		}
		// -------------------------------
		// Failed / Unimplemented
		throw `Unimplemented: ${JSON.stringify(exp)}`;
	}

	_evalBody(body, env) {
		if (body[0] === "begin") {
			return this._evalBlock(body, env);
		}
		return this.eval(body, env);
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
