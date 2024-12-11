export default {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
  },
};
