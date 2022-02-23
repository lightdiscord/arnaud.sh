import fs from "fs/promises"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CopyPlugin from "copy-webpack-plugin"
import { marked } from "marked"

import * as articleOne from "./articles/being-a-discord-user/index.js"

const transformArticle = async (article) => {
  const readme = await fs.readFile(article.readme)

  return [
    new CopyPlugin({
      patterns: [{
        from: article.assets.pathname,
        to: `./articles/${article.slug}`
      }]
    }),
    new HtmlWebpackPlugin({
      template: "src/article.html",
      filename: `articles/${article.slug}/index.html`,

      body: marked(readme.toString())
    })
  ]
}

export default (async () => ({
  mode: "development",

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    ...(await transformArticle(articleOne))
  ]
}))()
