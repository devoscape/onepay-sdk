const js = require("@eslint/js");
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
   {
    extends : [
       js.configs.recommended,
       ...tseslint.configs.recommended,
    ],
    files : ["**/*.ts"],
    ignores: ["node_module", "dist/**"]
   }
  );
