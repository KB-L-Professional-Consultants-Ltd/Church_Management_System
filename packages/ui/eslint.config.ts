import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { tanstackConfig } from "@tanstack/eslint-config"

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url))

export default [
  ...tanstackConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir,
      },
    },
  },
]
