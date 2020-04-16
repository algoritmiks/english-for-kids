const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',

    entry:  ['./src/index.js', './src/sass/style.scss'],

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
              {
                  loader: 'file-loader',
              }
          ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
    }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: './style.css'
      }),
      new CopyWebpackPlugin(
        [
          {from: './src/assets/img', to: './assets/img/'},
          {from: './src/assets/mp3', to: './assets/mp3/'}
        ]
      )
    ]
  }
  return config;
};
