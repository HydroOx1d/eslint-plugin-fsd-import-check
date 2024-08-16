/**
 * @fileoverview path should be relative
 * @author hydroox1d
 */
"use strict";

const { isRelative, layers } = require('../helpers')
const Path = require("path")

function shouldBeRelative(filename, path) {
	if (isRelative(path)) {
		return false;
	}

	const pathArray = path.split("/");
	
	const pathLayer = pathArray[0];
	const pathSlice = pathArray[1];
	
	if (!pathLayer || !pathSlice || !layers.has(pathLayer)) {
		return false;
	}

	const filenameArray = filename.split("src")[1].split(Path.sep).filter(Boolean);

	const filenameLayer = filenameArray[0];
	const filenameSlice = filenameArray[1];

	if (!filenameLayer || !filenameSlice || !layers.has(filenameLayer)) {
		return false;
	}

	return pathLayer === filenameLayer && pathSlice === filenameSlice;
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "path should be relative",
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
      shouldBeRelative: "This import should be relative"
    }, // Add messageId and message
  },

  create(ctx) {
const alias = ctx.options?.[0]?.alias ?? "";
		return {
			ImportDeclaration(node) {
				const nodeValue = node.source.value;
				const path = alias ? nodeValue.replace(`${alias}/`, "") : nodeValue;
				const filename = ctx.filename;
 
				if (shouldBeRelative(filename, path)) {
					ctx.report({
						node: node, 
						messageId: "shouldBeRelative",
						fix: (fixer) => {
							
							const afterSrcPartFilename = Path.toNamespacedPath(filename).split("src")[1].split("\\").filter(Boolean).slice(0, -1).join("/")

							let relative = Path.relative(afterSrcPartFilename, path).split("\\").join("/")

							if (!relative.startsWith(".")) {
								relative = "./" + relative
							}

							return fixer.replaceText(node.source, `"${relative}"`)
						}
					});
				}
			}
		};
  },
};
