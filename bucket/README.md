# My Toolbox Scoop Bucket

这是一个自建的 Scoop 存储桶，用于分发个人工具箱应用。

## 使用方法

### 添加存储桶

```powershell
scoop bucket add my-toolbox https://github.com/shisheng820/my-toolbox.git
```

### 安装应用

```powershell
scoop install my-toolbox/speedtest
```

## 可用应用

### speedtest

使用腾讯王者荣耀 CDN 进行网络测速的命令行工具。

**安装：**
```powershell
scoop install my-toolbox/speedtest
```

**使用：**
```bash
speedtest
speedtest -t 30
```

## 更新应用

```powershell
scoop update speedtest
```

## 卸载应用

```powershell
scoop uninstall speedtest
```
