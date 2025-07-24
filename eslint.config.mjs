import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = async () => {
  const globals = (await import("globals")).default;
  const jestPlugin = await import("eslint-plugin-jest");

  return [
    {
      ignores: ["**/*.test.ts", "**/*.test.tsx"], // 👈 Skip test files
    },
    ...compat.extends("next/core-web-vitals", "next/typescript"),

    // 👇 you can keep this block if you want to lint tests (optional)
    // {
    //   files: ["**/*.test.ts", "**/*.test.tsx"],
    //   plugins: {
    //     jest: jestPlugin,
    //   },
    //   languageOptions: {
    //     globals: {
    //       ...globals.jest,
    //     },
    //   },
    //   rules: {
    //     "jest/no-disabled-tests": "off",
    //     "jest/no-focused-tests": "error",
    //     "jest/no-identical-title": "error",
    //     "jest/prefer-to-have-length": "warn",
    //     "jest/valid-expect": "error",
    //   },
    // },
  ];
};

export default eslintConfig();
