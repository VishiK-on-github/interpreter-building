const Eva = require("../eva.js");

const tests = [
	require("./self-eval-test.js"),
	require("./math-test.js"),
	require("./variables-test.js"),
	require("./block-test.js"),
	require("./if-test.js"),
	require("./while-test.js"),
	require("./built-in-function-test.js"),
	require("./user-defined-function-test.js"),
	require("./lambda-test.js"),
	require("./switch-test.js"),
	require("./for-loop-test.js"),
];

// Tests
const eva = new Eva();

tests.forEach((test) => test(eva));

console.log("All assertions passed !");
