const { test } = require("./test-utils");

module.exports = (eva) => {
	// math functions
	test(eva, `(+ 1 5)`, 6);
	test(eva, `(+ (+ 2 3) 5)`, 10);
	test(eva, `(+ (* 2 3) 5)`, 11);
	// comparison
	test(eva, `(> 1 5)`, false);
	test(eva, `(< 1 5)`, true);
	test(eva, `(>= 5 5)`, true);
	test(eva, `(<= 5 5)`, true);
	test(eva, `(= 5 5)`, true);
};
