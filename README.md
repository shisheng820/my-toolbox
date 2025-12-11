# My Toolbox

我的个人极客工具箱 - 一个包含实用命令行工具的集合

## 功能

### 🚀 Speedtest - 网络测速工具

使用腾讯王者荣耀 CDN 进行网络测速，测试你的下载速度。

**特点：**
- 实时显示下载速度
- 显示峰值速度和平均速度
- 自定义测试时长
- 彩色终端输出

## 安装方式

### 方式一：通过 Scoop 安装（推荐）

```powershell
# 添加存储桶
scoop bucket add my-toolbox https://github.com/shisheng820/my-toolbox.git

# 安装工具
scoop install my-toolbox/speedtest
```

### 方式二：通过 npm 全局安装

```bash
npm install -g .
```

### 方式三：直接运行

```bash
npm install
npm start speedtest
```

## 使用方法

### Speedtest 测速

```bash
# 默认测试 15 秒
speedtest

# 自定义测试时长（秒）
speedtest -t 30
speedtest --time 30
```

如果你想使用工具箱命令：
```bash
mybox speedtest
mybox st
```

## 开发

```bash
# 安装依赖
npm install

# 运行工具
node bin/index.js speedtest
```

## 依赖要求

- Node.js >= 16.0.0
- npm

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
