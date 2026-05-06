// @ts-check

import js from "@eslint/js"
import tseslint from "typescript-eslint"
import { tanstackConfig } from "@tanstack/eslint-config"
import importPlugin from "eslint-plugin-import"
import unusedImports from "eslint-plugin-unused-imports"
import perfectionist from "eslint-plugin-perfectionist"
import boundaries from "eslint-plugin-boundaries"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import prettier from "eslint-config-prettier"

export default [
  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,

  ...tanstackConfig,

  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },

    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
      perfectionist,
      boundaries,
      react,
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