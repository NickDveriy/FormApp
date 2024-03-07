module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended", "plugin:import/recommended", "plugin:prettier/recommended"],
  rules: {
    quotes: [2, "double", "avoid-escape"],
    semi: ["error", "never"],
    "prettier/prettier": "error",
  },
  parserOptions: {
    ecmaVersion: 2022,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
}
