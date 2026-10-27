// ===== js/tiaozhuan.js =====
window.panoSequence = ['T1', 'T2', 'T3', 'T4', 'T5'];
window.currentPanoId = null;

// 点击箭头时调用的跳转函数
window.tiaoZhuan = function(direction) {
    if (!window.currentPanoId) {
        console.error("未能获取当前全景ID，请检查 panorama.js 是否正常工作！");
        return;
    }
    const currentIndex = window.panoSequence.indexOf(window.currentPanoId);
    let nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < window.panoSequence.length) {
        const nextId = window.panoSequence[nextIndex];

        if (window.showPanorama) {
            window.showPanorama(nextId); // 核心：触发全景刷新！
        }
    }
};
// 被 panorama.js 调用的状态更新函数（控制箭头显隐）
window.updateTiaoZhuanState = function(locationId) {
    window.currentPanoId = locationId;

    const currentIndex = window.panoSequence.indexOf(locationId);
    const nextHotspot = document.getElementById('nextHotspot');
    const prevHotspot = document.getElementById('prevHotspot');

    if (nextHotspot && prevHotspot) {
        // T1 隐藏后退，T5 隐藏前进
        prevHotspot.style.display = (currentIndex === 0) ? 'none' : 'flex';
        nextHotspot.style.display = (currentIndex === window.panoSequence.length - 1) ? 'none' : 'flex';
    }
};

// 退出全景时清空状态
window.clearTiaoZhuanState = function() {
    window.currentPanoId = null;
};