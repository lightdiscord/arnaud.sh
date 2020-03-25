const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function mode() {
  return process.env.NODE_ENV === "production"
    ? "production"
    : "development";
}

module.exports = {
  mode: mode(),
  entry: {
    home: require.resolve("@arnaud.sh/home")
  },
  output: {
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new (require("clean-webpack-plugin").CleanWebpackPlugin),

    new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    }),

    new (require("html-webpack-plugin"))({
      template: require.resolve("@arnaud.sh/home/src/index.html"),
      chunks: ["home"]
    })
  ]
};
