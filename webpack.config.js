'use strict';

// 此文件是单独为 webstorm 提供的配置文件和项目无关
const path = require('path');

module.exports = {
  context: path.join(__dirname, './'),
  resolve: {
    extensions: ['.js', '.less', '.css', '.json'],
    alias: {
      client: path.join(__dirname, 'client'),
      library: path.join(__dirname, 'library'),
    },
  },
};
