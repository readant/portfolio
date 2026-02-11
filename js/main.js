// 主脚本文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载项目数据
    loadProjects();
    
    // 添加平滑滚动
    addSmoothScroll();
});

// 加载项目数据（添加缓存机制）
function loadProjects() {
    // 尝试从多个路径加载项目数据
    const paths = ['/data/projects.json', '../data/projects.json'];
    let currentPathIndex = 0;
    
    // 检查本地缓存
    const cachedProjects = localStorage.getItem('cachedProjects');
    const cacheTimestamp = localStorage.getItem('projectsCacheTimestamp');
    const now = Date.now();
    const cacheExpiry = 3600000; // 缓存过期时间：1小时
    
    // 如果缓存存在且未过期，直接使用缓存数据
    if (cachedProjects && cacheTimestamp && (now - parseInt(cacheTimestamp)) < cacheExpiry) {
        try {
            const projects = JSON.parse(cachedProjects);
            renderProjects(projects);
            console.log('使用缓存的项目数据');
            return;
        } catch (error) {
            console.error('解析缓存的项目数据失败:', error);
            // 缓存解析失败，继续从网络加载
        }
    }
    
    function tryLoadPath(path) {
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                renderProjects(data.projects);
                // 缓存项目数据
                try {
                    localStorage.setItem('cachedProjects', JSON.stringify(data.projects));
                    localStorage.setItem('projectsCacheTimestamp', now.toString());
                    console.log('项目数据已缓存');
                } catch (error) {
                    console.error('缓存项目数据失败:', error);
                }
            })
            .catch(error => {
                currentPathIndex++;
                if (currentPathIndex < paths.length) {
                    tryLoadPath(paths[currentPathIndex]);
                } else {
                    console.error('加载项目数据失败:', error);
                }
            });
    }
    
    tryLoadPath(paths[0]);
}

// 渲染项目卡片
function renderProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    // 检查projects是否为数组
    if (!Array.isArray(projects) || projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="empty-projects" style="text-align: center; padding: 4rem 0; color: var(--text-light);">
                <i class="fas fa-box" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>暂无项目数据</p>
            </div>
        `;
        return;
    }
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        try {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        } catch (error) {
            console.error('创建项目卡片失败:', error);
            // 可以添加错误提示
        }
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
            navbar.style.backgroundColor = 'rgba(249, 246, 240, 0.95)';
            navbar.style.backdropFilter = 'blur(5px)';
        } else {
            navbar.style.backgroundColor = 'var(--paper-color)';
            navbar.style.backdropFilter = 'none';
        }
    }
});