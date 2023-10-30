module.exports = {
  mode: 'development',
  entry: ["./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },

  devtool: "source-map",
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        // include: resolve(__dirname, "./app"), //for some reason this was causing loaders error in client/index.js
        loader: "babel-loader",

        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
};
