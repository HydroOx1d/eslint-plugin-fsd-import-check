/**
 * @fileoverview path should be relative
 * @author hydroox1d
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/relative-path"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("relative-path", rule, {
  valid: [
		{
			code: "import Test from \"features/test\"",
			filename: "C:\\Users\\User\\Desktop\\projects\\production-project\\src\\pages\\about\\ui\\About.tsx",
		},
		{
			code: "import Test from \"@/features/test\"",
			filename: "C:\\Users\\User\\Desktop\\projects\\production-project\\src\\pages\\about\\ui\\About.tsx",
			options: [
				{
					alias: "@"
				}
			]
		},
		{
			code: "import Test from \"../model/types\"",
			filename: "C:\\Users\\User\\Desktop\\projects\\production-project\\src\\pages\\about\\ui\\About.tsx"
		},
	],
	invalid: [
		{
			code: "import Test from \"features/test/model/types\"",
			filename: "C:\\Users\\User\\Desktop\\projects\\production-project\\src\\features\\test\\ui",
			errors: [
				{
					message: "This import should be relative"
				}
			]
		},
		{
			code: "import Test from \"@/features/test/model/types\"",
			filename: "C:\\Users\\User\\Desktop\\projects\\production-project\\src\\features\\test\\ui",
			errors: [
				{
					message: "This import should be relative"
				}
			],
			options: [
				{
					alias: "@"
				}
			]
		},
	]
});
