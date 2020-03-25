const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
  plugins: [
    new CleanWebpackPlugin,
    new (require("html-webpack-plugin"))({
      template: require.resolve("@arnaud.sh/home/src/index.html"),
      chunks: ["home"]
    })
  ]
};
