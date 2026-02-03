// 主脚本文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载项目数据
    loadProjects();
    
    // 添加平滑滚动
    addSmoothScroll();
});

// 加载项目数据
function loadProjects() {
    fetch('data/projects.json')
        .then(response => response.json())
        .then(data => {
            renderProjects(data.projects);
        })
        .catch(error => {
            console.error('加载项目数据失败:', error);
        });
}

// 渲染项目卡片
function renderProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// 创建项目卡片
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" class="project-link">查看详情</a>
        </div>
    `;
    
    return card;
}

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
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(5px)';
        } else {
            navbar.style.backgroundColor = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    }
});