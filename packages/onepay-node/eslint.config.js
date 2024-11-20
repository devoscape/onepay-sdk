const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
  ],
  files: ["**/*.ts"],
  ignores: ["node_module", "dist/**", "**/*.test.ts"],
});
