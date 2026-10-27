// ===== 折叠状态管理 =====
let sectionStates = {
    draw: true,
    measure: true
};

// 切换折叠状态并保存
function toggleSection(section) {
    const sectionEl = document.getElementById(`${section}Section`);
    const arrow = sectionEl.previousElementSibling.querySelector('.arrow');


    sectionStates[section] = !sectionStates[section];
    sectionEl.classList.toggle('collapsed');
    arrow.classList.toggle('up');

    // 保存状态到 localStorage
    saveSectionStates();
}

// 保存状态到本地存储
function saveSectionStates() {
    localStorage.setItem('sectionStates', JSON.stringify(sectionStates));
}

// 从本地存储读取状态
function loadSectionStates() {
    const saved = localStorage.getItem('sectionStates');
    if (saved) {
        sectionStates = JSON.parse(saved);
        Object.keys(sectionStates).forEach(section => {
            const sectionEl = document.getElementById(`${section}Section`);
            const arrow = sectionEl.previousElementSibling.querySelector('.arrow');
            if (!sectionStates[section]) {
                sectionEl.classList.add('collapsed');
                arrow.classList.add('up');
            }
        });
    }
}

// 初始化页面
window.addEventListener('DOMContentLoaded', () => {
    // 加载保存的状态
    loadSectionStates();

    // 设置初始高度以支持动画
    document.querySelectorAll('.section-content').forEach(el => {
        if (el.classList.contains('collapsed')) {
            el.style.maxHeight = '0';
        } else {
            el.style.maxHeight = el.scrollHeight + 'px';
        }
    });
});