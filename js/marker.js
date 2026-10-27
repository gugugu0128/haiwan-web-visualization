// 等待AMap和DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    AMapLoader.load({
        key: window.APP_CONFIG.AMAP_KEY,
        version: "2.0",
        plugins: ["AMap.PlaceSearch"]
    }).then(initMap);
});

function initMap(AMap) {
    // 初始化地图 (假设您已有地图初始化代码)
    if (!window.map) {
        window.map = new AMap.Map('mapContainer', {
            viewMode: '3D',
            zoom: 17,
            center: [118.077072, 24.472301]
        });
    }

    // 创建标记点
    const markers = [
        {
            id: 'T1',
            position: [118.085969,24.622069],
            title: '南门中轴线绿地3'

        },
        {
            id: 'T2',
            position: [118.085525,24.621656],
            title: '南门中轴线绿地2'
        },
        {
            id: 'T3',
            position: [118.085235,24.621315],
            title: '南门中轴线绿地1'
        },
        {
            id: 'T4',
            position: [118.084725,24.620843],
            title: '南门入口广场'
        },
        {
            id: 'T5',
            position: [118.084184,24.620414],
            title: '理工社区公园'
        }
    ];

    // 添加标记点到地图
    markers.forEach(point => {
        const marker = new AMap.Marker({
            position: point.position,
            title: point.title,
            content: `<div class="custom-marker">${point.id}</div>`,
            offset: new AMap.Pixel(-10, -10)
        });

        // 绑定点击事件
        marker.on('click', function() {
            window.showPanorama(point.id);
        });

        map.add(marker);
    });
}