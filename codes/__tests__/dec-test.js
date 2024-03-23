const { test } = require("./test-utils");

module.exports = (eva) => {
	test(
		eva,
		`
    (begin

      (var result 1)

      (-- result)

      result

    )

  `,
		0
	);
};
