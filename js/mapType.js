let map; // 地图实例
let satelliteLayer; // 卫星图层
let roadNetLayer; // 路网图层

AMapLoader.load({
    key: window.APP_CONFIG.AMAP_KEY,
    version: "2.0",
}).then((AMap) => {
    // 初始化地图
    map = new AMap.Map("mapContainer", {
        viewMode: '2D',
        zoom: 16.5,
        center: [118.08739,24.623678],
        mapStyle: "amap://styles/normal"
    });
    window.map = map;
    // 初始化卫星图层（默认不显示）
    satelliteLayer = new AMap.TileLayer.Satellite();
    // 初始化路网图层（默认不显示）
    roadNetLayer = new AMap.TileLayer.RoadNet();
    //
    trafficLayer=new AMap.TileLayer.Traffic();
    // 添加控件
    AMap.plugin(
        [
            "AMap.ToolBar",
            "AMap.Scale",
            "AMap.HawkEye",
            "AMap.ControlBar",
            "AMap.Geolocation",
        ],
        function () {
            //添加工具条控件
            map.addControl(new AMap.ToolBar({
                position: {
                    bottom: '55px',
                    left: '15px',
                }
            }));
            map.addControl(new AMap.Geolocation({
                position: {
                    bottom: '55px',
                    left: '55px',
                }
            }));
            //添加比例尺控件，展示地图在当前层级和纬度下的比例尺
            map.addControl(new AMap.Scale());
            //添加鹰眼控件，在地图右下角显示地图的缩略图
            map.addControl(new AMap.HawkEye({ isOpen: true }));
            //添加控制罗盘控件，用来控制地图的旋转和倾斜
            map.addControl(new AMap.ControlBar({position: 'RT'}));
        }
    );
    //多边形路径数据（经纬度坐标数组）
    const pathArr = [
        [118.076483,24.476355], [118.076105,24.476133], [118.075543,24.475668],
        [118.075227,24.475082], [118.074056,24.470852], [118.074367,24.470766],
        [118.074621,24.470967], [118.074782,24.471029], [118.074914,24.471015],
        [118.074936,24.471134], [118.078177,24.471317], [118.077975,24.474329],
        [118.077931,24.475331], [118.077695,24.475665], [118.077083,24.476063],
        [118.076984,24.476123], [118.076905,24.4762], [118.076912,24.476306],
        [118.076778,24.476413], [118.076548,24.476298], [118.076483,24.476355],
    ];
    //创建多边形实例
    const polygon = new AMap.Polygon({
        path: pathArr, //多边形路径
        fillColor: "#ccebc5", //多边形填充颜色
        strokeOpacity: 1, //线条透明度
        fillOpacity: 0.00, //填充透明度
        strokeColor: "#000000", //线条颜色
        strokeWeight: 1.5, //线条宽度
        strokeStyle: "dashed", //线样式
        strokeDasharray: [6,2], //轮廓的虚线和间隙的样式
    });
    //鼠标移入更改样式
    polygon.on("mouseover", () => {
        polygon.setOptions({
            strokeColor: "#e77c7c", //线条颜色
            strokeWeight: 8, //线条宽度
            strokeStyle: "solid", //线样式
        });
    });
    //鼠标移出恢复样式
    polygon.on("mouseout", () => {
        polygon.setOptions({
            strokeColor: "#000000", //线条颜色
            strokeWeight: 1.5, //线条宽度
            strokeStyle: "dashed", //线样式
            strokeDasharray: [6,2], //轮廓的虚线和间隙的样式
        });
    });
    // 添加多边形到地图
    map.add(polygon)



});

// 切换地图类型
function switchLayer(type) {
    if (type === 'satellite') {
        satelliteLayer.setMap(map); // 显示卫星图
        map.setMapStyle('amap://styles/normal'); // 关闭2D样式
    } else {
        satelliteLayer.setMap(null); // 隐藏卫星图
        map.setMapStyle('amap://styles/normal'); // 恢复2D样式
    }
}

// 切换路网显示
function toggleRoadNet() {
    const checkbox = document.getElementById('roadNetCheckbox');
    if (checkbox.checked) {
        roadNetLayer.setMap(map); // 显示路网
    } else {
        roadNetLayer.setMap(null); // 隐藏路网
    }
}
//添加路况显示
function toggletraffic() {
    const checkbox = document.getElementById('trafficCheckbox');
    if (checkbox.checked) {
        trafficLayer.setMap(map); // 显示路网
    } else {
        trafficLayer.setMap(null); // 隐藏路网
    }
}