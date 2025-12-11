#!/usr/bin/env node
import runSpeedTest from '../commands/speedtest.js';

const args = process.argv.slice(2);
let duration = 15;

for (let i = 0; i < args.length; i++) {
  if ((args[i] === '-t' || args[i] === '--time') && args[i + 1]) {
    duration = parseInt(args[i + 1]);
    break;
  }
}

runSpeedTest(duration);
