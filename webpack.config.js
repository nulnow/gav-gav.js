const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './resources/js/app.js',
    output: {
      path: path.resolve(__dirname, 'public/js/bundle'),
      filename: 'app.js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '../../css/bundle/app.css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: './public/css/app.css'
              }
            },
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.scss']
    }
};