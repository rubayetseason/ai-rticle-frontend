import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Resolve current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize compatibility layer
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Async function to build ESLint config
const eslintConfig = async () => {
  const globals = (await import("globals")).default;
  const jestPlugin = await import("eslint-plugin-jest");

  return [
    ...compat.extends("next/core-web-vitals", "next/typescript"),

    {
      files: ["**/*.test.ts", "**/*.test.tsx"],
      plugins: {
        jest: jestPlugin,
      },
      languageOptions: {
        globals: {
          ...globals.jest,
        },
      },
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
      },
    },
  ];
};

export default eslintConfig();
