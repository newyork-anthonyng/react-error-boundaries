const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),

  entry: "./index.js",

  output: {
    path: path.resolve(__dirname),

    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};
