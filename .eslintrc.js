module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
    "jest/globals": true,
  },
  extends: [
    "plugin:vue/essential",
    "plugin:vue/recommended",
    "eslint:recommended",
    "plugin:compat/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    extraFileExtensions: [".vue"],
  },
  plugins: [
    "@typescript-eslint",
    "vue",
    "jest",
    "deprecate"
  ],
  rules: {
    curly: [2, "all"],
    "no-console": "error",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/multi-word-component-names": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
  },
  settings: {
    polyfills: [],
  },
  ignorePatterns: [
    "*.d.ts",
  ],
};
