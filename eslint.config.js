import prettierConfig from "eslint-config-prettier";
import oxlint from "eslint-plugin-oxlint";

export default [
  { ignores: ["node_modules", "old"] },
  prettierConfig,
  ...oxlint.buildFromOxlintConfigFile("./oxlint.json"),
];
