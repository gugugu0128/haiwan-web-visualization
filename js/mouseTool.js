let mouseTool; // 绘图工具实例
let rangingTool; // 测距工具实例
let overlays = []; // 存储所有覆盖物

// 初始化地图
AMapLoader.load({
    key: window.APP_CONFIG.AMAP_KEY,
    plugins: ["AMap.MouseTool", "AMap.RangingTool"] // 加载必要插件
}).then((AMap) => {
    // 初始化绘图工具
    mouseTool = new AMap.MouseTool(map);
    // 初始化测距工具
    rangingTool = new AMap.RangingTool(map, {
        startMarkerOptions: { color: "#ff0000" }, // 起点标记样式
        midMarkerOptions: { color: "#00ff00" },   // 中间点标记样式
        endMarkerOptions: { color: "#0000ff" }    // 终点标记样式
    });
});

// 启动绘图
function startDraw(type) {
    // 清除之前的状态
    clearActiveButtons();
    event.target.classList.add('active');

    mouseTool.close(); // 关闭之前的工具

    switch(type) {
        case 'polyline':
            mouseTool.polyline({
                strokeColor: "#3366FF",
                strokeWeight: 3
            });
            break;
        case 'polygon':
            mouseTool.polygon({
                fillColor: "#FF33FF",
                strokeWeight: 2
            });
            break;
        case 'marker':
            mouseTool.marker({
                //同Marker的Option设置
            });
            break;
        case 'circle':
            mouseTool.circle({
                fillColor: "#33FFCC",
                strokeWeight: 2
            });
            break;
        case 'rectangle':
            mouseTool.rectangle({
                fillColor: "#FF9933",
                strokeWeight: 2
            });
            break;
    }

    // 保存绘制结果
    mouseTool.on('draw', (e) => {
        overlays.push(e.obj);
    });
}

// 启动测量
function startMeasure(type) {
    clearActiveButtons();
    event.target.classList.add('active');
    mouseTool.close();
    if(type === 'distance') {
        rangingTool.turnOn(); // 开启测距
    } else if(type === 'area') {
        mouseTool.polygon({
            strokeColor: "#FF33FF",
            fillOpacity: 0.2,
            fillColor: "#FF33FF"
        });
        mouseTool.on('draw', (e) => {
            const area = AMap.GeometryUtil.ringArea(e.obj.getPath());
            alert(`面积: ${Math.abs(area).toFixed(2)} 平方米`);
        });
    }
}

// 清除所有覆盖物
function clearOverlays() {
    overlays.forEach(overlay => overlay.setMap(null));
    overlays = [];
    rangingTool.turnOff(); // 关闭测距
    clearActiveButtons();
    mouseTool.close();
}

// 清除按钮激活状态
function clearActiveButtons() {
    document.querySelectorAll('.tool-group button').forEach(btn => {
        btn.classList.remove('active');
    });
}