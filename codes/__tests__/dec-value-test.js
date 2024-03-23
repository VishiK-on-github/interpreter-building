const { test } = require("./test-utils");

module.exports = (eva) => {
	test(
		eva,
		`
    (begin

      (var result 5)

      (-= result 5)

      result

    )

  `,
		0
	);
};
