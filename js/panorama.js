// 全景配置
const panoramaConfig = {
    T1: {
        front: 'picture/T1/t1.front.jpg',
        back: 'picture/T1/t1.back.jpg',
        right: 'picture/T1/t1.right.jpg',
        left: 'picture/T1/t1.left.jpg',
        top: 'picture/T1/t1.top.jpg',
        bottom: 'picture/T1/t1.bottom.jpg'
    },
    T2: {
        front: 'picture/T2/t2.front.jpg',
        back: 'picture/T2/t2.back.jpg',
        right: 'picture/T2/t2.right.jpg',
        left: 'picture/T2/t2.left.jpg',
        top: 'picture/T2/t2.top.jpg',
        bottom: 'picture/T2/t2.bottom.jpg'
    },
    T3: {
        front: 'picture/T3/t3.front.jpg',
        back: 'picture/T3/t3.back.jpg',
        right: 'picture/T3/t3.right.jpg',
        left: 'picture/T3/t3.left.jpg',
        top: 'picture/T3/t3.top.jpg',
        bottom: 'picture/T3/t3.bottom.jpg'
    },
    T4: {
        front: 'picture/T4/t4.front.jpg',
        back: 'picture/T4/t4.back.jpg',
        right: 'picture/T4/t4.right.jpg',
        left: 'picture/T4/t4.left.jpg',
        top: 'picture/T4/t4.top.jpg',
        bottom: 'picture/T4/t4.bottom.jpg'
    },
    T5: {
        front: 'picture/T5/t5.front.jpg',
        back: 'picture/T5/t5.back.jpg',
        right: 'picture/T5/t5.right.jpg',
        left: 'picture/T5/t5.left.jpg',
        top: 'picture/T5/t5.top.jpg',
        bottom: 'picture/T5/t5.bottom.jpg'
    },
};

// 全局变量
let currentRotation = { x: -10, y: 0 };
let isDragging = false;
let lastPosition = { x: 0, y: 0 };
let cubeElement;

// 初始化全景查看器
function initPanoramaViewer() {
    const container = document.getElementById('panoramaContainer');
    cubeElement = document.querySelector('.panorama-cube');
    const loadingIndicator = document.querySelector('.loading-indicator');

    // 鼠标拖动旋转
    cubeElement.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);

    // 触摸屏支持
    cubeElement.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', endDrag);

    // 退出按钮
    document.getElementById('exitPanorama').addEventListener('click', hidePanorama);

    // 预加载所有全景图片
    preloadPanoramas();
}

// 显示全景
window.showPanorama = function(locationId) {
    const container = document.getElementById('panoramaContainer');
    const loadingIndicator = document.querySelector('.loading-indicator');

    // 显示加载指示器
    loadingIndicator.style.display = 'block';
    container.style.display = 'flex';
    // 关键握手：通知 tiaozhuan.js 记录新状态并控制箭头的显示/隐藏！
    if (window.updateTiaoZhuanState) {
        window.updateTiaoZhuanState(locationId);
    }
    // 加载图片
    loadPanoramaImages(locationId, () => {
        // 图片加载完成后隐藏加载指示器
        loadingIndicator.style.display = 'none';
        // 关键体验优化：切换场景后，把视角重置到正前方
        currentRotation = { x: 0, y: 0 };
        updateCubeRotation();
    });
};

// 隐藏全景
function hidePanorama() {
    document.getElementById('panoramaContainer').style.display = 'none';

    // 关键握手：退出全景时，通知 tiaozhuan.js 清空状态！
    if (window.clearTiaoZhuanState) {
        window.clearTiaoZhuanState();
    }
}

// 加载全景图片
function loadPanoramaImages(locationId, callback) {
    const config = panoramaConfig[locationId];
    if (!config) {
        console.error('无效的全景位置:', locationId);
        return;
    }
    const faces = {
        front: document.querySelector('.panorama-front'),
        back: document.querySelector('.panorama-back'),
        left: document.querySelector('.panorama-left'),
        right: document.querySelector('.panorama-right'),
        top: document.querySelector('.panorama-top'),
        bottom: document.querySelector('.panorama-bottom')
    };
    let loadedCount = 0;
    const totalFaces = 6;
    function checkAllLoaded() {
        loadedCount++;
        if (loadedCount === totalFaces && callback) {
            callback();
        }
    }
    // 加载每个面的图片
    loadImage(faces.front, config.front, checkAllLoaded);
    loadImage(faces.back, config.back, checkAllLoaded);
    loadImage(faces.left, config.left, checkAllLoaded);
    loadImage(faces.right, config.right, checkAllLoaded);
    loadImage(faces.top, config.top, checkAllLoaded);
    loadImage(faces.bottom, config.bottom, checkAllLoaded);
}

// 加载单个图片
function loadImage(element, src, callback) {
    const img = new Image();
    img.onload = function() {
        element.style.backgroundImage = `url(${src})`;
        if (callback) callback();
    };
    img.onerror = function() {
        console.error('图片加载失败:', src);
        element.style.backgroundImage = 'linear-gradient(45deg, #555, #222)';
        if (callback) callback();
    };
    img.src = src;
}

// 预加载所有全景图片
function preloadPanoramas() {
    Object.values(panoramaConfig).forEach(config => {
        Object.values(config).forEach(src => {
            new Image().src = src;
        });
    });
}

// 拖动控制函数
function startDrag(e) {
    isDragging = true;
    lastPosition = {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY
    };
    e.preventDefault();
}
function handleTouchStart(e) {
    startDrag(e.touches[0]);
}
function drag(e) {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const currentY = e.clientY || e.touches[0].clientY;

    const deltaX = currentX - lastPosition.x;
    const deltaY = currentY - lastPosition.y;
    // 限制水平旋转角度
    currentRotation.y += deltaX * 0.2;
    // 限制垂直旋转角度
    currentRotation.x -= deltaY * 0.2;
    currentRotation.x = Math.max(-90, Math.min(90, currentRotation.x));
    updateCubeRotation();
    lastPosition = {
        x: currentX,
        y: currentY,
    };
    e.preventDefault();
}

function handleTouchMove(e) {
    drag(e.touches[0]);
}

function endDrag() {
    isDragging = false;
}

function updateCubeRotation() {
    // 限制垂直旋转角度 (-90到90度之间)
    currentRotation.x = Math.max(-90, Math.min(90, currentRotation.x));
    // 动态设置 transform-origin
    cubeElement.style.transformOrigin = '50% 50% 500px';
    cubeElement.style.transform =
        `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg) `;
}

// ====== 请确保你的 panorama.js 里这两个函数长这样 ======

window.showPanorama = function(locationId) {
    const container = document.getElementById('panoramaContainer');
    const loadingIndicator = document.querySelector('.loading-indicator');

    // 👇 就是这一行最关键！如果没有这一行，tiaozhuan.js 就会变成瞎子！
    if (window.updateTiaoZhuanState) {
        window.updateTiaoZhuanState(locationId);
    }

    loadingIndicator.style.display = 'block';
    container.style.display = 'flex';

    // 加载图片
    loadPanoramaImages(locationId, () => {
        loadingIndicator.style.display = 'none';

        // 视角重置到正前方
        currentRotation = { x: 0, y: 0 };
        updateCubeRotation();
    });
};

function hidePanorama() {
    document.getElementById('panoramaContainer').style.display = 'none';

    // ⬇️ 只需要加上这几行：通知独立文件里的函数停止音乐
    if (window.stopPanoramaMusic) {
        window.stopPanoramaMusic();
    }
    // 👇 退出全景时告诉 tiaozhuan.js 清除记录
    if (window.clearTiaoZhuanState) {
        window.clearTiaoZhuanState();
    }

}

// 初始化全景查看器
document.addEventListener('DOMContentLoaded', initPanoramaViewer);