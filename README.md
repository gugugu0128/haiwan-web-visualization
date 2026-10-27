# HaiWan｜城市空间可视化与实景导览系统

基于 JavaScript、CSS3 与高德地图 JavaScript API 的 Web 可视化项目，包含底图切换、POI 检索、步行路径规划、绘制/测量，以及六面体全景浏览与地图标记联动。

## 主要功能
- 标准地图、卫星影像、路网与实时路况切换
- 点/线/面/圆/矩形绘制
- 距离与面积测量
- POI 检索与步行路径规划
- CSS3 3D Transform 六面体全景浏览
- 地图 Marker 与全景场景联动

## 本地运行
1. 将 `config.example.js` 复制为 `config.js`。
2. 在 `config.js` 中填写自己的高德 Web 端 Key 和安全密钥。
3. 使用本地 HTTP 服务器打开项目（例如 VS Code Live Server）。

## 安全说明
真实 `config.js` 不应提交到 GitHub。浏览器端 Key 无法对最终用户完全隐藏，因此请使用专门的演示 Key，并在高德开放平台设置域名白名单。公开仓库不包含真实 Key 或 `securityJsCode`。

## 音频资源
已包含背景音乐 `music/bgm.mp3`，可通过页面中的音乐按钮播放或暂停。全景照片位于 `picture/T1` 至 `picture/T5`，每组包含前、后、左、右、上、下六张图片。