/**
 * @fileoverview underlying layers must not import overlying ones
 * @author hydroox1d
 */
"use strict";
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const Path = require("path")
const micromatch = require("micromatch")
const {isRelative} = require("../helpers")

const layers = {
  app: ["pages", "widgets", "features", "entity", "shared"],
  pages: ["widgets", "features", "entity", "shared"],
  widgets: [ "features", "entity", "shared"],
  features: [ "entity", "shared"],
  entity: [ "entity", "shared"],
  shared: ["shared"],
}

const avalableLayers = new Set(["features", "entity", "pages", "widgets", "app"]);


/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "underlying layers must not import overlying ones",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
				type: "object",
				properties: {
					alias: {
						type: "string"
					},
          ignorePatterns: {
            type: "array"
          }
				}
			}
    ], // Add a schema if the rule has options
    messages: {
      layerImport: "The layer can import only underlying layers (app, pages, widgets, features, entity, shared)"
    }, // Add messageId and message
  },

  create(ctx) {
    const {alias = "", ignorePatterns = []} = ctx.options?.[0] ?? {};

    const getFilenameLayer = () => {
      const filename = ctx.filename

      const namespaced = Path.toNamespacedPath(filename)
      const filenameArray = namespaced?.split("src")[1]
      const segments = filenameArray?.split("\\")

      return segments?.[1]
    }

    const getImportLayer = (value) => {
      const path = value.replace(`${alias}/`, '');

      const segments = path.split("/")

      return segments?.[0]
    }
    
    return {
      ImportDeclaration(node) {
        const value = node.source.value
        const importLayer = getImportLayer(value);
        const fileLayer = getFilenameLayer()

        if (isRelative(value)) {
          return;
        }

        if (!avalableLayers.has(importLayer) || !avalableLayers.has(fileLayer)) {
          return;
        }
        
        const isIgnore = ignorePatterns.some(pattern => micromatch.isMatch(value, pattern))
        
        if (isIgnore) {
          return;
        }

        if (!layers[fileLayer].includes(importLayer)) {
          ctx.report({
            node,
            messageId: "layerImport"
          })
        }
      }
    };
  },
};
