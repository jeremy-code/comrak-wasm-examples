import { rspack } from "@rspack/core";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";

const isDev = process.env.NODE_ENV === "development";

export default {
  entry: { main: "./src/index.tsx" },
  devtool: "source-map",
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  mode: isDev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|jsx|ts|tsx)$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            detectSyntax: "auto",
            jsc: {
              transform: {
                react: {
                  runtime: "automatic",
                  development: isDev,
                  refresh: isDev,
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: "./index.html" }),
    isDev && new ReactRefreshRspackPlugin(),
    isDev && new rspack.HotModuleReplacementPlugin(),
  ],
};
