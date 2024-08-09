/**
 * @fileoverview import should be public api
 * @author hydroox1d
 */
"use strict";

const { layers, isRelative } = require('../helpers');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "import should be public api",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [
      {
				type: "object",
				properties: {
					alias: {
						type: "string"
					}
				}
			}
    ], // Add a schema if the rule has options
    messages: {
      publicApi: "The import must be from the public api"
    }, // Add messageId and message
  },

  create(ctx) {
    const alias = ctx.options?.[0]?.alias ?? "";
    return {
      ImportDeclaration(node) {
				const nodeValue = node.source.value;

				if (isRelative(nodeValue)) return;

				const path = alias ? nodeValue.replace(`${alias}/`, "") : nodeValue;

				const segments = path.split("/");

				const layer = segments[0];
				const slice = segments[1];

				if (!layers.has(layer)) return;

				const isImportFromPublicApi = segments.length <= 2;

				if (!isImportFromPublicApi) {
					ctx.report({
            node: node, 
            messageId: "publicApi", 
            fix(fixer) {
              return fixer.replaceText(node.source, `"${alias ? alias + "/" : ""}${layer}/${slice}"`)
            }
          });
				}
			}
    };
  },
};
