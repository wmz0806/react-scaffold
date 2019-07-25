const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const config = require('./global.dev');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 浏览器端的配置
const browserConfig = {
  mode: 'development', // "production" | "development" | "none"  指定当前编译版本

  devtool: 'cheap-module-source-map',

  // 入口文件
  entry: {
    index: [path.join(__dirname, '../client/index.js')],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=babel',
      },
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          // {
          //   loader: 'css-hot-loader',
          //   options: {
          //     reloadAll: true,
          //   },
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'filename-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'primary-color': '#3C4FA0', // 全局主色
                'link-color': '#4DC2FF', // 链接色
                'success-color': '#32B16C', // 成功色
                'warning-color': '#FEAE22', // 警告色
                'error-color': '#FF4D4F', // 错误色

                'font-size-base': '14px', // 主字号
                'heading-color': '#333', // 标题色
                'text-color': '#333', // 主文本色
                'text-color-secondary ': '#999', // 次文本色
                'disabled-color ': '#ccc', // 失效色
                'border-radius-base': '4px', // 组件/浮层圆角
                'border-color-base': '#E5E5E5', // 边框色
                'box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)', // 浮层阴影

                'screen-xs': 1,
                'screen-sm': 1,
                'screen-md': 1,
                'screen-lg': 1,
                'screen-xl': 1,
                'screen-xxl': 1,
              },
              javascriptEnabled: true,
            },
          },
          'filename-loader',
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg)$/,
        use: [
          'filename-loader',
          {
            loader: 'url-loader',
            options: {
              name: 'img/[name]-[hash:5].[ext]',
              limit: 8000, // 大概8k以下的图片打包成base64
            },
          },
        ],
      },
      {
        test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'img/[sha512:hash:base64:7].[ext]',
          },
        },
      },
    ],
  },

  plugins: [
    new ProgressBarPlugin({
      format: '编译进度：[:bar] :percent (耗时：:elapsed 秒)',
      clear: true,
      width: 60,
      stream: process.stdout ? process.stdout : undefined,
    }),

    // 页面可用的变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${config.env}"`,
      __CLIENT__: true,
      __DEV__: config.env === 'development',
      __SERVER__: false,
    }),

    new MiniCssExtractPlugin({
      filename: 'style/[name].css',
      chunkFilename: 'chunk/[name].css',
    }),
  ],
};

const webpackConfig = merge(baseConfig, browserConfig);

module.exports = webpackConfig;
