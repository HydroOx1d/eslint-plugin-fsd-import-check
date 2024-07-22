/**
 * @fileoverview underlying layers must not import overlying ones
 * @author hydroox1d
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/layer-imports"),
  RuleTester = require("eslint").RuleTester;

const aliasOptions = [{
  alias: "@"
}]


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("layer-imports", rule, {
  valid: [

    {

      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\features\\Article',

      code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",

      errors: [],

      options: aliasOptions,

    },
    {

      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\features\\Article\\model\\types\\index.ts',

      code: "import { StateSchema } from '@/app/providers/StoreProvider'",

      errors: [],

      options: [
        {
          alias: "@",
          ignorePatterns: ["**/StoreProvider"]
        }
      ],

    },

    {

      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\features\\Article',

      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entity/Article'",

      errors: [],

      options: aliasOptions,

    },

    {

      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\app\\providers',

      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",

      errors: [],

      options: aliasOptions,

    },

    {

      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\widgets\\pages',

      code: "import { useLocation } from 'react-router-dom'",

      errors: [],

      options: aliasOptions,

    },

    {

      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\app\\providers',

      code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",

      errors: [],

      options: aliasOptions,

    },

    {

      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\index.tsx',

      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",

      errors: [],

      options: aliasOptions,

    },

  ],



  invalid: [

    {

      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entity\\Article.tsx',

      code: "import { StateSchema } from '@/app/providers/StoreProvider'",

      errors: [{ message: "The layer can import only underlying layers (app, pages, widgets, features, entity, shared)"}],

      options: [

        {

          alias: '@',

        }

      ],

    },

    {

      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entity\\providers',

      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Articl'",

      errors: [{ message: "The layer can import only underlying layers (app, pages, widgets, features, entity, shared)"}],

      options: aliasOptions,

    },

    {

      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\features\\providers',

      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",

      errors: [{ message: "The layer can import only underlying layers (app, pages, widgets, features, entity, shared)"}],

      options: aliasOptions,

    },

    {

      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\entity\\providers',

      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",

      errors: [{ message: "The layer can import only underlying layers (app, pages, widgets, features, entity, shared)"}],

      options: aliasOptions,

    },

  ],
});
