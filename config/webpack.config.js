const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    hot: true,
    static: "./dist",
    compress: true,
    port: 8564,
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: "index.html",
      inject: true,  // Automatically inject script tag for bundle.js
      template: "./dist/index.html",
    }),
    new CleanWebpackPlugin(),  // Clears dist folder between builds
  ],
  devtool: "inline-source-map",
  performance: {
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              disable: true,  // Disable during development
            },
          },
        ],
      },
    ],
  },
};
