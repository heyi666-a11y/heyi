// 主系统功能 - 不依赖Supabase

// 全局变量
let currentPage = 'home';

// DOM元素
const pages = document.querySelectorAll('.page');

// 页面切换函数
function showPage(pageId) {
    // 隐藏所有页面
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示指定页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
    }
    
    // 如果是学生主页面或欢迎页面，显示公告
    if (pageId === 'student-home' || pageId === 'welcome') {
        showLatestAnnouncements();
    }
    
    // 如果是图书馆系统页面，隐藏主导航栏
    const mainNav = document.querySelector('.main-nav');
    if (pageId === 'student-home' || pageId === 'borrow-page' || pageId === 'return-page' || 
        pageId === 'library-page' || pageId === 'search-page' || pageId === 'admin-home' || 
        pageId === 'admin-login-page' || pageId === 'library-entry') {
        mainNav.style.position = 'relative';
    } else {
        mainNav.style.position = 'sticky';
    }
}

// 显示最新公告
function showLatestAnnouncements() {
    // 此函数将在app.js中实现，这里仅定义接口
    if (typeof window.showLatestAnnouncements === 'function') {
        window.showLatestAnnouncements();
    }
}

// 初始化主系统事件监听器
function initMainEventListeners() {
    // 主导航栏事件
    document.querySelectorAll('.nav-menu .nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = item.getAttribute('data-page');
            showPage(pageId);
            
            // 更新导航状态
            document.querySelectorAll('.nav-menu .nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
            item.classList.add('active');
        });
    });
    
    // 荣誉公示标签切换
    document.querySelectorAll('.honors-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabId = btn.getAttribute('data-tab');
            
            // 更新标签按钮状态
            document.querySelectorAll('.honors-tabs .tab-btn').forEach(tabBtn => {
                tabBtn.classList.remove('active');
            });
            btn.classList.add('active');
            
            // 更新内容显示
            document.querySelectorAll('.honors-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 图书馆入口按钮
    document.getElementById('enter-library-btn')?.addEventListener('click', () => {
        showPage('library-entry');
    });
    
    // 图书馆入口页面功能
    document.getElementById('enter-student-library')?.addEventListener('click', () => showPage('student-home'));
    document.getElementById('enter-admin-library')?.addEventListener('click', () => showPage('admin-login-page'));
    document.getElementById('back-to-main-btn')?.addEventListener('click', () => {
        showPage('home');
        // 更新导航状态
        document.querySelectorAll('.nav-menu .nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        document.querySelector('.nav-menu .nav-item[data-page="home"]').classList.add('active');
    });
}

// 添加导航栏滚动效果
function initNavScrollEffect() {
    window.addEventListener('scroll', () => {
        const mainNav = document.querySelector('.main-nav');
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });
}

// 初始化主系统
function initMainSystem() {
    // 初始化事件监听器
    initMainEventListeners();
    
    // 添加导航栏滚动效果
    initNavScrollEffect();
    
    console.log('主系统初始化完成');
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    initMainSystem();
});
