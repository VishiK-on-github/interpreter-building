const Eva = require("../eva.js");
const Environment = require("../environment.js");

const tests = [
	require("./self-eval-test.js"),
	require("./math-test.js"),
	require("./variables-test.js"),
	require("./block-test.js"),
];

// Tests
const eva = new Eva(
	new Environment({
		null: null,

		true: true,
		false: false,

		VERSION: "0.1",
	})
);

tests.forEach((test) => test(eva));

console.log("All assertions passed !");
