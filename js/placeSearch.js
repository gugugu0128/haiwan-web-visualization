let placeSearch; // 搜索实例
let searchInput = document.getElementById("searchInput");
let searchResult = document.getElementById("searchResult");

// 初始化搜索功能
function initSearch() {
    AMapLoader.load({
        key: window.APP_CONFIG.AMAP_KEY,
        plugins: ["AMap.PlaceSearch"]
    }).then((AMap) => {
        // 创建搜索实例（限定厦门市）
        placeSearch = new AMap.PlaceSearch({
            city: "厦门",
            pageSize: 5,
            map: map, // 关联地图实例
            panel: "searchResult", // 结果展示容器
            autoFitView: true // 自动调整视野
        });

        // 绑定搜索按钮
        document.getElementById("searchBtn").onclick = function() {
            if (searchInput.value.trim()) {
                placeSearch.search(searchInput.value.trim());
            }
        };

        // 绑定清除按钮
        document.getElementById("clearSearchBtn").onclick = function() {
            map.setZoomAndCenter(17.5, [118.077744,24.473633]);
            searchInput.value = "";
            placeSearch.clear();
            searchResult.innerHTML = "";

        };
    });
}
// 初始化（在地图加载完成后调用）
initSearch();