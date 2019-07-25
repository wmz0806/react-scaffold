const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const manifest = require('../.dll/manifest');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const HappyPack = require('happypack');
// 多线程运行
const happyThreadPool = HappyPack.ThreadPool({size: 4});

let config;
if (process.env.NODE_ENV === 'production') {
  config = require('./global.prod');
} else {
  config = require('./global.dev');
}

// 复制 静态文件到 public
const resourceStaticPath = path.join(__dirname, '../client/resource/static');
const copyFatherPath = path.join(config.contextPath, config.static);
const copyPath = path.join(copyFatherPath, 'static');
if (!fs.existsSync(copyFatherPath)) {
  fs.mkdirSync(copyFatherPath);
}

function copyFolder(from, to) { // 复制文件夹到指定目录
  let files = [];
  if (fs.existsSync(to)) { // 文件是否存在 如果不存在则创建
    files = fs.readdirSync(from);
    files.forEach((file) => {
      const targetPath = path.join(from, file);
      const toPath = path.join(to, file);
      if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
        copyFolder(targetPath, toPath);
      } else { // 拷贝文件
        fs.copyFileSync(targetPath, toPath);
      }
    });
  } else {
    fs.mkdirSync(to);
    copyFolder(from, to);
  }
}

function deleteFolder(p) {
  let files = [];
  if (fs.existsSync(p)) {
    if (fs.statSync(p).isDirectory()) {
      files = fs.readdirSync(p);
      files.forEach((file) => {
        const curPath = path.join(p, file);
        if (fs.statSync(curPath).isDirectory()) {
          deleteFolder(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(p);
    } else {
      fs.unlinkSync(p);
    }
  }
}

deleteFolder(copyPath);
copyFolder(resourceStaticPath, copyPath);

const happyPackLoaders = process.env.NODE_ENV === 'production' ?
  [
    'cache-loader',
    'babel-loader?cacheDirectory',
  ] :
  [
    'cache-loader',
    'babel-loader?cacheDirectory',
    'filename-loader',
    'eslint-loader',
  ];

module.exports = {
  devtool: 'hidden-source-map',

  output: {
    path: path.join(config.contextPath, config.path),
    publicPath: `${config.publicPath}/`,
    filename: 'js/[name].js',
    chunkFilename: 'chunk/[name].js',
  },

  resolve: {
    extensions: ['.js', '.less', '.css', '.json'],
    alias: {
      client: path.join(__dirname, '../client'),
      library: path.join(__dirname, '../library'),
    },
  },

  // 加入自定义loader的路径
  resolveLoader: {
    modules: [
      path.join(config.contextPath, 'config/loader'),
      'node_modules',
    ],
  },

  // externals: {
  // react: 'React',
  // 'react-dom': 'ReactDOM',
  // dva: 'dva',
  // },

  optimization: {
    splitChunks: {
      chunks: 'all', // all, async, initial 三选一, 插件作用的chunks范围// initial只对入口文件处理
      name: 'chunk',
      // automaticNameDelimiter: '~', //如果不指定name，自动生成name的分隔符（‘runtime~[name]’）

      // cacheGroups: {
      // styles: {
      //   name: 'styles',
      //   test: /\.css$/,
      //   chunks: 'all',
      //   enforce: true,
      // },
      // vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
      //   test: /[\\/]node_modules[\\/]/,
      //   name: 'vendors',
      //   chunks: 'all',
      //   priority: 10,
      // },
      // common: {
      //   minSize: 1, // bytes 1KB = 1 * 1024 bytes
      //   minChunks: 2,
      //   name: 'commons',
      //   chunks: 'async',
      //   priority: 10,
      //   reuseExistingChunk: true,
      // },
      // },
    },

    runtimeChunk: {
      name: 'manifest',
    },
  },

  plugins: [
    // 指定首页
    new HtmlWebpackPlugin({
      filename: config.templateName,
      // chunks: ['manifest', 'index'],
      // favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
      template: path.resolve(__dirname, '../client/layout/index.html'),
      hash: config.env === 'development',
      title: config.title,
      staticPath: config.staticPath,
      minify: {
        collapseWhitespace: config.env === 'production', // 去除html的换行
        minifyJS: config.env === 'production', // 压缩html中的js
      },
    }),

    new HappyPack({
      // 多线程运行 默认是电脑核数-1
      id: 'babel', // 对于loaders id
      loaders: happyPackLoaders,
      threadPool: happyThreadPool,
      verboseWhenProfiling: true, // 显示信息
    }),

    new webpack.DllReferencePlugin({
      manifest,
    }),

    new AddAssetHtmlPlugin([{
      filepath: path.join(__dirname, '../.dll/dll.js'),
      // outputPath: '',
      // publicPath: '',
      includeSourcemap: false,
      hash: true,
    }]),
  ],

  node: {
    fs: 'empty',
    path: 'empty',
    console: false,
    process: true,
    global: true,
    Buffer: true,
    setImmediate: true,
    __filename: 'mock',
    __dirname: 'mock',
  },

  cache: true, // boolean
  watch: false, // boolean
};
