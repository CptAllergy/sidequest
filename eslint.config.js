import { defineConfig, globalIgnores } from "eslint/config";
import { tanstackConfig } from "@tanstack/eslint-config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  ...tanstackConfig,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "@typescript-eslint/array-type": ["error", { default: "array" }],
      // TODO add rule for key required in mapping (jsx-key)
    },
  },
  globalIgnores(["**/*.js", "**/*.cjs", "**/*.mjs"]),
]);
