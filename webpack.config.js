const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    index: './packages/index.js',
    utils: './packages/utils/index.js'
  },
  devtool: 'none',
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    library: 'antd-kit',
    libraryTarget: 'umd',
    sourceMapFilename: '[file].map', // string
  },
  /*   optimization: {
    sideEffects: false,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      })
    ]
  }, */
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    antd: {
      commonjs: 'antd',
      commonjs2: 'antd',
      amd: 'antd',
    },
    moment: {
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment',
    },
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
    }, {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: './index.css' // 文件目录会放入output.path里
    }),
  ],
};
