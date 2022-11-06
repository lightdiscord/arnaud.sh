import RemarkHTML from "remark-html"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { visit } from "unist-util-visit"

import * as articles from "./articles/index.js"

function remarkHeading() {
  return (tree, file) => {
    file.data.heading = []

    visit(tree, "heading", (node) => {
      const { depth, children: [child] } = node;
      const { value } = child;

      const id = value.toLowerCase()
        .replaceAll(" ", "-")
        .replace(/[^a-z0-9-]/g, "")

      // Make the header clickable.
      const link = {
        type: "link",
        url: `#${id}`,
        children: [child]
      };

      node.children[0] = link;

      // Add the correct id to the header
      node.data = { hProperties: { id } };

      // Register the header
      file.data.heading.push({ depth, id, value })
    })
  }
}

export default (async () => ({
  mode: process.env.NODE_ENV === "production" ? "production" : "development",

  entry: ["./src/style.css"],

  output: {
    clean: process.env.NODE_ENV === "production",
    publicPath: "/"
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
                plugins: [
                  remarkHeading,
                  // Stop clobbering id.
                  [RemarkHTML, { sanitize: { clobber: ["name"] } }]
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["tailwindcss", "autoprefixer"]
              }
            }
          }
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "src/templates/home.ejs",
      articles: Object.values(articles)
    }),
    ...Object.values(articles).map((article) => new HtmlWebpackPlugin({
      template: "src/templates/article.ejs",
      filename: `articles/${article.slug}/index.html`,
      article
    }))
  ]
}))()
