const { test } = require("./test-utils");

module.exports = (eva) => {
	test(
		eva,
		`
    (begin

      (var x 10)

      (switch ((= x 10) 100)
              ((> x 10) 200)
              (else     300))

    )
    `,
		100
	);
};
