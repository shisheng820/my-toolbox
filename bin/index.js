#!/usr/bin/env node
import { Command } from 'commander';
import runSpeedTest from '../commands/speedtest.js';

const program = new Command();

program
  .name('mybox')
  .description('我的个人极客工具箱')
  .version('1.0.0');

program
  .command('speedtest')
  .alias('st')
  .description('使用腾讯王者荣耀 CDN 进行网络测速')
  .option('-t, --time <number>', '测试持续时间(秒)', '15')
  .action((options) => {
    runSpeedTest(parseInt(options.time));
  });

program.parse(process.argv);
