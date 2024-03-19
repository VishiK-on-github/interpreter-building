// AST Transformer
class Transformer {
	// translates def function declaration into
	// variable declaration with a lambda
	transformDefToLambda(exp) {
		const [_tag, name, params, body] = exp;
		return ["var", name, ["lambda", params, body]];
	}
	// translates switch to sequence
	// of if statements
	transformSwitchToIf(switchExp) {
		const [_tag, ...cases] = switchExp;

		const ifExp = ["if", null, null, null];

		let current = ifExp;

		for (let i = 0; i < cases.length - 1; i++) {
			const [currentCond, currentBlock] = cases[i];

			current[1] = currentCond;
			current[2] = currentBlock;

			const next = cases[i + 1];

			const [nextCond, nextBlock] = next;

			current[3] = nextCond === "else" ? nextBlock : ["if"];

			current = current[3];
		}

		return ifExp;
	}
	// translates for loop to while loop
	transformForToWhile(forExp) {
		const [_tag, init, condition, modifier, body] = forExp;

		const whileExp = [
			"begin",
			init,
			["while", condition, ["begin", body, modifier]],
		];

		return whileExp;
	}
}

module.exports = Transformer;
