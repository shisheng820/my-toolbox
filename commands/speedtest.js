import axios from 'axios';
import chalk from 'chalk';

const ENTRY_URL = 'https://pvp.qq.com/zlkdatasys/mct/d/play.shtml?device=android';
const USER_AGENT = 'Mozilla/5.0 (Linux; Android 10; SM-G9600) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36';

async function getRealDownloadUrl(entryUrl) {
  try {
    const response = await axios.get(entryUrl, {
      headers: { 'User-Agent': USER_AGENT },
      maxRedirects: 5,
    });
    
    const finalUrl = response.request.res.responseUrl;
    if (finalUrl && finalUrl.includes('.apk')) {
      return finalUrl;
    }
    
    const match = response.data.match(/(https?:\/\/[^"'\s]+\.apk)/i);
    if (match && match[1]) {
      return match[1];
    }
    
    throw new Error('未找到 APK 下载链接');
  } catch (error) {
    throw new Error(`获取下载链接失败: ${error.message}`);
  }
}

async function runSpeedTest(duration = 15) {
  try {
    console.log(chalk.yellow('🔍 正在获取王者荣耀 CDN 链接...'));
    const url = await getRealDownloadUrl(ENTRY_URL);
    console.log(chalk.green(`✅ 目标: ${url.substring(0, 60)}...`));
    console.log(chalk.cyan(`🚀 开始测速 (${duration}秒)...\n`));

    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
      timeout: 10000
    });

    let downloadedBytes = 0;
    let lastBytes = 0;
    const startTime = Date.now();
    let lastTime = startTime;
    let peakSpeed = 0;

    const updateInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;
      
      if (elapsed >= duration) {
        clearInterval(updateInterval);
        response.data.destroy();
        
        const totalMB = downloadedBytes / (1024 * 1024);
        const avgSpeed = totalMB / elapsed;
        
        console.log(chalk.green('\n\n✅ 测试完成'));
        console.log(chalk.white(`📊 总下载: ${totalMB.toFixed(2)} MB`));
        console.log(chalk.white(`⚡ 平均速度: ${avgSpeed.toFixed(2)} MB/s`));
        console.log(chalk.white(`🚀 峰值速度: ${peakSpeed.toFixed(2)} MB/s`));
        process.exit(0);
      }
      
      const durationSec = (now - lastTime) / 1000;
      const bytesInInterval = downloadedBytes - lastBytes;
      const speedMBps = (bytesInInterval / durationSec) / (1024 * 1024);
      
      if (speedMBps > peakSpeed) {
        peakSpeed = speedMBps;
      }
      
      const totalMB = downloadedBytes / (1024 * 1024);
      process.stdout.write(`\r⬇️  已下载: ${totalMB.toFixed(2)} MB | 当前速度: ${speedMBps.toFixed(2)} MB/s | 峰值: ${peakSpeed.toFixed(2)} MB/s`);
      
      lastBytes = downloadedBytes;
      lastTime = now;
    }, 500);

    response.data.on('data', (chunk) => {
      downloadedBytes += chunk.length;
    });

    response.data.on('error', (error) => {
      clearInterval(updateInterval);
      console.error(chalk.red(`\n❌ 下载错误: ${error.message}`));
      process.exit(1);
    });

  } catch (error) {
    console.error(chalk.red(`❌ ${error.message}`));
    process.exit(1);
  }
}

export default runSpeedTest;
