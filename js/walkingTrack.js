let walking; // 绘图工具实例
let startPoint = document.getElementById("startPoint");
let endPoint = document.getElementById("endPoint");

function initwalking(){
    AMapLoader.load({
        key: window.APP_CONFIG.AMAP_KEY,
        plugins: ["AMap.Walking", "AMap.Geocoder"] // 加载必要插件
    }).then((AMap) => {
        walking=new AMap.Walking({
            map: map,
            policy:0,
        })
        // 绑定搜索按钮
        document.getElementById("startNavigation").onclick = function() {
            walking.search([
                { keyword:startPoint.value.trim(), city: "厦门" },
                { keyword:endPoint.value.trim(), city: "厦门" },
            ], function (status, result) {
                if (status === 'complete') {
                    console.log('路线规划成功', result);
                    // 绘制路线代码...
                } else {
                    console.error('错误:', result);
                    alert("规划失败: " + (result.info || '未知错误'));
                }
            });
        };
        // 新增清除路径功能
        document.getElementById("clearResult").onclick = function() {
            if (walking) {
                walking.clear(); // 清除步行路线
            }
            startPoint.value = "";
            endPoint.value = "";
            map.setZoomAndCenter(17.5, [118.077744,24.473633]);

        };
    });
}
initwalking()
