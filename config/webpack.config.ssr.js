const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');

// const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.config.base');

const config = require('./global.prod');

const ssrConfig = {
  mode: 'production', // "production" | "development" | "none"  指定当前编译版本

  devtool: 'source-map',

  target: 'node',

  // 入口文件
  entry: {
    index: path.join(__dirname, '../client/index.js'),
  },

  output: {
    filename: '[name].ssr.js',
    path: path.join(config.contextPath, config.path),
    publicPath: `${config.publicPath}/`,
    chunkFilename: 'ssr/[name].js',
    libraryTarget: 'commonjs2', // 设置导出类型，web端默认是var，node需要module.exports = xxx的形式
  },

  optimization: {
    splitChunks: false,

    runtimeChunk: false,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: { // node端的babel编译配置可以简化很多
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              ['import', { libraryName: 'antd', libraryDirectory: 'lib'}, 'ant'],
              '@babel/plugin-syntax-dynamic-import',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              'transform-es2015-modules-commonjs', // 如果不转换成require，import 'xxx.styl'会报错
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.(css|less)$/,
        use: {
          loader: 'null-loader',
        },
      },
      {
        test: /\.(gif|png|jpg|jpeg)$/,
        use: [
          {
            loader: 'null-loader',
          },
        ],
      },
      {
        test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
        // exclude: /node_modules/,
        use: {
          loader: 'null-loader',
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${config.env}"`,
      __CLIENT__: false,
      __DEV__: config.env === 'development',
      __SERVER__: true,
    }),
  ],

  // externals: [nodeExternals()], //不把node_modules中的文件打包
  externals: Object.keys(require('../package.json').dependencies),
};
baseConfig.plugins = [];

const webpackConfig = merge(baseConfig, ssrConfig);

module.exports = webpackConfig;
