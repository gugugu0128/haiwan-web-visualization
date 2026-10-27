// js/musicPlayer.js

// 初始化音乐控制
function initMusicPlayer() {
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');

    if (!musicBtn || !bgMusic) return; // 确保元素存在

    musicBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 防止触发底层全景元素的点击

        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.innerHTML = '暂停音乐 ⏸️';
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = '播放音乐 🎵';
        }
    });
}

// 暴露一个全局函数，供其他脚本（比如退出全景时）调用
window.stopPanoramaMusic = function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');

    if (bgMusic && !bgMusic.paused) {
        bgMusic.pause();
        bgMusic.currentTime = 0; // 将音乐进度归零
        if (musicBtn) musicBtn.innerHTML = '播放音乐 🎵'; // 恢复按钮文字
    }
};

// 页面加载完成后自动初始化
document.addEventListener('DOMContentLoaded', initMusicPlayer);