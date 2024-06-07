import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["**/node_modules", "**./dist"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        process: "readonly",
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "no-undef": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-console": "warn",
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
