// https://medium.com/@sreejithezhakkad/how-to-start-a-web-app-project-using-bootstrap-with-npm-webpack-185e510a782e
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: process.env.PORT || 8080,
    hot: true,
    allowedHosts: "all"
  },
  resolve: {
    fallback: {
        "fs": false
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'en',
        filename: 'index.html',
        template: "./html/index.html",
    }),
    new HtmlWebpackPlugin({
        title: 'jp',
        filename: 'jp.html',
        template: "./html/index.html",
    })
  ]
}