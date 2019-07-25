#!/usr/bin/env node

/* eslint-disable func-style */

/**
 * 此脚本用于打包页面并部署到主机。 (仅仅是 市直机关)
 * 注意：新项目自行修改 remotePath, pmApp
 * Options:
 *   --build: 打包命令，如 build, build:dev，默认build
 *   --host: 主机ip
 *   --pw: 密码
 *
 */

const util = require('util');
const path = require('path');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);

const {argv} = require('yargs');
const SSH = require('simple-ssh');
const scpClient = require('scp2');
const compressing = require('compressing');
const ora = require('ora');


/** 当前项目相关 */
const zip = 'app,client,config,library,public'; // 需要进入压缩包的文件

const zipName = 'to-g-apps-preProd.zip'; // zip 压缩后的临时文件名

const pm2Cmd = '/usr/local/node/bin/pm2'; // 服务器pm2命令位置

const {
  build = 'cross-env NODE_ENV=production webpack --config config/webpack.config.prod.js',
  host = '10.10.100.113',
  remotePath = '/data/项目名字', // 服务器文件目录
  pmApp = '项目名字', // pm2本项目的 app名字
} = argv; // pakage.json script 传入的参数

// 预发布
const USER = 'tomcat'; // 用户名
const pw = '12354@qwsf'; // 密码

async function main() {
  const spinner = ora('').start();

  spinner.text = '[1/4] 构建代码...';

  const result = await exec(build);

  console.log(result.stdout);

  spinner.text = '[2/4] 生成 zip 包...';

  await zipFile(zip.split(','));

  spinner.text = '[3/4] 上传 zip 包到主机...';

  await scp();

  spinner.text = '[4/4] 开始远程解压重启...';

  await execRemoteOperations();

  spinner.stop();
}

function zipFile(files) {
  return new Promise((resolve, reject) => {
    const zipStream = new compressing.zip.Stream();
    files.forEach((item) => {
      zipStream.addEntry(path.join(process.cwd(), item));
    });
    const destStream = fs.createWriteStream(path.join(process.cwd(), zipName));
    zipStream
      .pipe(destStream)
      .on('error', (err) => {
        reject(err);
      })
      .on('finish', () => {
        resolve();
      });
  });
}


function scp() {
  return new Promise((resolve, reject) => {
    scpClient.scp(
      `${zipName}`,
      {
        host,
        username: USER,
        password: pw,
        path: remotePath,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

function execRemoteOperations() {
  return new Promise((resolve, reject) => {
    const ssh = new SSH({
      host,
      user: USER,
      pass: pw,
    });
    ssh
      .exec(
        `unzip -o -d ${remotePath.split(path.sep).join('/')} ${path
          .join(remotePath, zipName)
          .split(path.sep)
          .join('/')}`,
        {
          out: stdout => console.log(stdout),
          err: err => console.log(err),
        }
      )
      .exec(
        `rm ${path
          .join(remotePath, zipName)
          .split(path.sep)
          .join('/')}`,
        {
          out: stdout => console.log(stdout),
          err: err => console.log(err),
        }
      )
      .exec(pm2Cmd, {
        args: ['restart', pmApp],
        out: stdout => console.log(stdout),
        err: err => console.log(err),
        exit: (code) => {
          if (code == 0) {
            resolve();
          } else {
            reject(code);
          }
        },
      })
      .on('error', (err) => {
        console.log(err);
        ssh.end();
        reject(err);
      })
      .start();
  });
}

main()
  .then(() => console.log('[Finished] 部署页面成功'))
  .catch((err) => {
    console.error('部署页面出错：');
    console.error(err);
  });
