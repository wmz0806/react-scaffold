const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const globalConfig = require('../../config/global.dev');

const watcherStatic = chokidar.watch(path.join(process.cwd(), 'client/resource/static'));

watcherStatic.on('ready', () => {
  watcherStatic.on('change', (ph) => {
    // 文件发生改变
    watcherUpdate('change', ph);
  });
  watcherStatic.on('add', (ph) => {
    // 新增文件
    watcherUpdate('add', ph);
  });

  watcherStatic.on('unlink', (ph) => {
    // 删除文件
    watcherUpdate('unlink', ph);
  });
});

function watcherUpdate() {
  const resourceStaticPath = path.join(process.cwd(), 'client/resource/static');
  const copyFatherPath = path.join(globalConfig.contextPath, globalConfig.static);
  const copyPath = path.join(copyFatherPath, 'static');

  if (!fs.existsSync(copyFatherPath)) {
    fs.mkdirSync(copyFatherPath);
  }

  deleteFolder(copyPath);
  copyFolder(resourceStaticPath, copyPath);

  console.log('静态资源文件更新成功');
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
