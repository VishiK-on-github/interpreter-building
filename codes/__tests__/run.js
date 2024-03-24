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
	require("./dec-test.js"),
	require("./dec-value-test.js"),
	require("./inc-test.js"),
	require("./inc-value-test.js"),
	require("./class_test.js"),
	require("./module-test.js"),
	require("./import-test.js"),
];

// Tests
const eva = new Eva();

tests.forEach((test) => test(eva));

console.log("All assertions passed !");
