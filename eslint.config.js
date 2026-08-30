import { defineConfig, globalIgnores } from "eslint/config";
import { tanstackConfig } from "@tanstack/eslint-config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintReact from "@eslint-react/eslint-plugin";

export default defineConfig([
  ...tanstackConfig,
  eslintPluginPrettierRecommended,
  {
    extends: [eslintReact.configs["recommended-typescript"]],

    rules: {
      "@typescript-eslint/array-type": ["error", { default: "array" }],
    },
  },
  globalIgnores(["**/*.js", "**/*.cjs", "**/*.mjs"]),
]);
