const { resolve } = require("path");

module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        // include: resolve(__dirname, "./app"), //for some reason this was causing loaders error in client/index.js
        loader: require.resolve("babel-loader"),

        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
