// @ts-check

import js from "@eslint/js"
import { tanstackConfig } from "@tanstack/eslint-config"
import prettier from "eslint-config-prettier"
import boundaries from "eslint-plugin-boundaries"
import perfectionist from "eslint-plugin-perfectionist"
import reactHooks from "eslint-plugin-react-hooks"
import unusedImports from "eslint-plugin-unused-imports"
import tseslint from "typescript-eslint"

export default [
  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,

  ...tanstackConfig,

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      "unused-imports": unusedImports,
      perfectionist,
      boundaries,
      "react-hooks": reactHooks,
    },

    settings: {
      react: {
        version: "detect",
      },
      "boundaries/elements": [
        { type: "app", pattern: "apps/web/**" },
        { type: "shared", pattern: "packages/**" },
      ],
    },

    rules: {
      /* -------------------- Console -------------------- */
      "no-console": ["error", { allow: ["warn", "error"] }],

      /* -------------------- TypeScript -------------------- */
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",

      /* -------------------- Imports -------------------- */
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      /* -------------------- Sorting -------------------- */
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],

      /* -------------------- Restrict bad imports -------------------- */
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../../*"],
              message: "Use absolute imports instead",
            },
          ],
        },
      ],

      /* -------------------- React Hooks -------------------- */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* -------------------- Monorepo Boundaries -------------------- */
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["shared"],
            },
            {
              from: "shared",
              allow: ["shared"],
            },
          ],
        },
      ],
    },
  },

  /* -------------------- Prettier (must be last) -------------------- */
  prettier,
]
