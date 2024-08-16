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
			code: "import Test from \"features/test/model/types/test\"",
			filename: "C:\\Users\\User\\Desktop\\projects\\production-project\\src\\features\\test\\ui\\Test.tsx",
			errors: [
				{
					message: "This import should be relative"
				}
			],
			output: "import Test from \"../model/types/test\""
		},
		{
			code: "import Test from \"@/features/test/model/types/test\"",
			filename: "C:\\Users\\User\\Desktop\\projects\\production-project\\src\\features\\test\\ui\\Test.tsx",
			errors: [
				{
					message: "This import should be relative"
				}
			],
			options: [
				{
					alias: "@"
				}
			],
			output: "import Test from \"../model/types/test\""
		},
		{
			code: "import Test from \"@/features/test/ui/Test2\"",
			filename: "C:\\Users\\User\\Desktop\\projects\\production-project\\src\\features\\test\\ui\\Test.tsx",
			errors: [
				{
					message: "This import should be relative"
				}
			],
			options: [
				{
					alias: "@"
				}
			],
			output: "import Test from \"./Test2\""
		},
	]
});
