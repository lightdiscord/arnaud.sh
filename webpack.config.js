import RemarkHTML from "remark-html"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

import * as articles from "./articles/index.js"

export default (async () => ({
  mode: "development",

  entry: ["./src/style.css"],

  output: {
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.png$/,
        type: "asset/resource"
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
            options: {
              sources: {
                list: [
                  "...",
                  {
                    tag: "a",
                    attribute: "href",
                    type: "src",
                    filter: (tag, attribute, [{ value }], resourcePath) => {
                      return /^\.\//.test(value)
                    }
                  }
                ]
              }
            }
          },
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [RemarkHTML],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "src/home.html",
    }),
    ...Object.values(articles).map((article) => new HtmlWebpackPlugin({
      template: "src/article.html",
      filename: `articles/${article.slug}/index.html`,
      article
    }))
  ]
}))()
