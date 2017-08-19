/* eslint-disable */
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const execSync = require('child_process').execSync;

const { version } = require('../package.json');
const buildPath = path.resolve(__dirname, '..', `dist${version}`);

/**
 * 在 dist 目录创建 package.json 。
 */
function createServerPackage () {
  const { name, version, private: pri, description, dependencies } = require('../package.json');
  const buildPackage = {
    name,
    version,
    description,
    private: pri,
    scripts: {
      'chmod': 'chmod +x ./forever/run.sh && chmod +x ./forever/stop.sh',
      'forever': './forever/run.sh',
      "forever-dev": "./forever/run.sh --dev",
      "dev": "npm run chmod && npm run forever-dev",
      'start': 'npm run chmod && npm run forever',
      'stop': './forever/stop.sh'
    },
    dependencies: {}
  };
  Object.keys(dependencies).forEach(name => {
    buildPackage.dependencies[name] = dependencies[name];
  });
  const file = path.resolve(buildPath, 'package.json');
  fs.writeFileSync(file, JSON.stringify(buildPackage, null, 2));
  console.log(chalk.green('package.json 已创建！\n'));
};

/**
 * 复制 forever 到 dist 目录
 */
function copyForever() {
  fs.copySync(
    path.resolve(buildPath, '..', 'forever'),
    path.resolve(buildPath, 'forever')
  );
  console.log(chalk.green('forever 已复制！\n'));
}

function copySSLFiles() {
  fs.copySync(
    path.resolve(buildPath, '..', 'ssl'),
    path.resolve(buildPath, 'ssl')
  );
  console.log(chalk.green('ssl 已复制！\n'));
}

function deleteFiles() {
  const files = ['dist/dev.server.js'];
  files.forEach(f => {
    fs.removeSync(path.join(buildPath, f));
  });
}

fs.emptyDirSync(buildPath);

execSync(`babel src -d dist${version}/dist --copy-files`);

createServerPackage();

copySSLFiles();

copyForever();

deleteFiles();
