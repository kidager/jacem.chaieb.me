import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import deprecate from "eslint-plugin-deprecate";
import compat from "eslint-plugin-compat";
import globals from "globals";
import js from "@eslint/js";

export default [
    {
        ignores: [
            "**/*.d.ts",
            "dist/**/*",
            ".output/**/*",
            ".nuxt/**/*",
            "eslint.config.mjs"
        ],
    },
    js.configs.recommended,
    ...vue.configs["flat/recommended"],
    {
        files: ["**/*.vue", "**/*.ts", "**/*.js"],

        plugins: {
            "@typescript-eslint": typescriptEslint,
            deprecate,
            compat,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.commonjs,
            },

            ecmaVersion: 2018,
            sourceType: "module",

            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                project: "tsconfig.json",
                extraFileExtensions: [".vue"],
            },
        },

        settings: {
            polyfills: [],
        },

        rules: {
            ...typescriptEslint.configs.recommended.rules,
            ...compat.configs["flat/recommended"].rules,
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
