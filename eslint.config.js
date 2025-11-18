//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

// TODO can this config be simplified?
export default [
  ...tanstackConfig,
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: { allowDefaultProject: ["*.js"] },
      },
    },
  },
];
