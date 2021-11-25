module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "google",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsdoc/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "jsdoc"],
  rules: {
    // JSDoc は eslint-plugin-jsdoc でチェックするため off
    // ref: https://eslint.org/blog/2018/11/jsdoc-end-of-life
    "valid-jsdoc": "off",
    "require-jsdoc": "off",

    // TypeScript なのでわざわざ型を明記する必要がない気がする
    "jsdoc/require-param-type": "off",
    "jsdoc/require-returns-type": "off",

    // JSDoc はすべての関数に付けたい
    "jsdoc/require-description": ["error"],

    // 引数名を間違ってはいけない
    "jsdoc/check-param-names": ["error"],

    // 引数の説明は必ず付ける
    "jsdoc/require-param-description": ["error"],
  },
};
