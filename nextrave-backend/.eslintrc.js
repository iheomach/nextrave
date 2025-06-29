module.exports = {
  plugins: ["import"],
  rules: {
    "import/no-internal-modules": [
      "error",
      {
        allow: ["**/infrastructure/*"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
