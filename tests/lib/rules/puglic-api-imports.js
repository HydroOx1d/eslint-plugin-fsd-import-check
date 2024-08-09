/**
 * @fileoverview import should be public api
 * @author hydroox1d
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/puglic-api-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("puglic-api-imports", rule, {
  valid: [
		{
			code: "import Test from \"@/features/test\"",
			filename: "C:\\Users\\User\\Desktop\\projects\\production-project\\src\\pages\\about\\ui\\About.tsx",
			options: [
				{
					alias: "@"
				}
			]
		}
	],
	invalid: [
		{
			code: "import Test from \"features/test/model/types\"",
			filename: "C:\\Users\\User\\Desktop\\projects\\production-project\\src\\pages\\about\\ui\\About.tsx",
			errors: [
				{
					message: "The import must be from the public api"
				}
			],
			output: "import Test from \"features/test\""
		}
	]
});
