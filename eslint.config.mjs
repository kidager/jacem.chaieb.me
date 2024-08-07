import typescriptEslint from "@typescript-eslint/eslint-plugin";
import vue from "eslint-plugin-vue";
import jest from "eslint-plugin-jest";
import deprecate from "eslint-plugin-deprecate";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    {
        ignores: [
            "**/*.d.ts",
            "eslint.config.mjs"
        ],
    },
    ...compat.extends(
        "plugin:vue/essential",
        "plugin:vue/recommended",
        "eslint:recommended",
        "plugin:compat/recommended",
        "plugin:jest/recommended",
        "plugin:jest/style",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-recommended"
    ),
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
            vue,
            jest,
            deprecate,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.commonjs,
                ...jest.environments.globals.globals,
            },

            ecmaVersion: 2018,
            sourceType: "commonjs",

            parserOptions: {
                extends: "standard",
                parser: "@typescript-eslint/parser",
                project: "tsconfig.json",
                tsconfigRootDir: "/home/node/app",
                extraFileExtensions: [".vue"],
            },
        },

        settings: {
            polyfills: [],
        },

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

            "@typescript-eslint/no-unused-vars": ["error", {
                ignoreRestSiblings: true,
            }],
        },
    }
];
