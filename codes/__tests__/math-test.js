// Math tests
const assert = require("assert");

module.exports = (eva) => {
	assert.strictEqual(eva.eval(["+", 1, 5]), 6);
	assert.strictEqual(eva.eval(["+", ["+", 3, 2], 5]), 10);
	assert.strictEqual(eva.eval(["-", 10, 2]), 8);
	assert.strictEqual(eva.eval(["/", 10, 2]), 5);
};
