const { test } = require("./test-utils");

module.exports = (eva) => {
	test(
		eva,
		`
    (import Math)

    ((prop Math abs) (- 10))

  `,
		10
	);

	test(
		eva,
		`
    (var abs (prop Math abs))

    (abs (- 10))

  `,
		10
	);

	test(
		eva,
		`
    (prop Math MAX_VALUE)

  `,
		1000
	);
};
