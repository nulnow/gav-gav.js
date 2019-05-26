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
          use: [{loader: "source-map-loader"}, {loader: "babel-loader"} ],
          enforce: "pre"
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