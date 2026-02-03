// 项目页面脚本文件

document.addEventListener('DOMContentLoaded', function() {
    // 添加平滑滚动
    addSmoothScroll();
    
    // 添加导航栏滚动效果
    addNavbarScrollEffect();
    
    // 添加项目图片点击放大效果
    addImageClickEffect();
});

// 添加平滑滚动
function addSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 添加导航栏滚动效果
function addNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(5px)';
            } else {
                navbar.style.backgroundColor = 'var(--white)';
                navbar.style.backdropFilter = 'none';
            }
        });
    }
}

// 添加项目图片点击放大效果
function addImageClickEffect() {
    const images = document.querySelectorAll('.gallery-item img');
    
    images.forEach(image => {
        image.addEventListener('click', function() {
            // 这里可以添加图片放大查看功能
            // 例如创建一个模态框显示大图
            console.log('图片点击:', this.src);
        });
    });
}