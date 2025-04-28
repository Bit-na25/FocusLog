import eslintPluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import parserTypeScript from "@typescript-eslint/parser";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
    languageOptions: {
      parser: parserTypeScript,
      sourceType: "module",
      ecmaVersion: 2020,
    },
    plugins: {
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
      "@typescript-eslint": pluginTypeScript,
      jsxA11y: eslintPluginJsxA11y,
    },
    rules: {
      "prettier/prettier": "error", // Prettier 스타일 위반을 에러로
      "react/react-in-jsx-scope": "off", // Vite+React에서는 필요없음
      "@typescript-eslint/no-unused-vars": "warn", // 사용하지 않는 변수 경고
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
