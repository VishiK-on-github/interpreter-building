const { test } = require("./test-utils");

module.exports = (eva) => {
	test(
		eva,
		`
    (begin

      (var result 0)

      (++ result)

      result

    )

  `,
		1
	);
};
