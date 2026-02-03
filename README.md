# 个人作品集网站

一个美观、响应式的个人作品集网站，用于展示个人项目和技能。

## 项目特点

- **响应式设计**: 适配桌面和移动设备
- **现代UI**: 简洁、美观的用户界面
- **易于维护**: 清晰的目录结构和代码组织
- **动态内容**: 使用JavaScript动态加载项目数据
- **GitHub Pages部署**: 免费、简单的部署方案

## 目录结构

```
portfolio/
├── index.html          # 首页
├── projects/           # 项目页面
│   ├── project1.html   # 项目1详情
│   ├── project-template.html # 项目模板
│   └── ...             # 更多项目
├── css/                # 样式文件
│   ├── style.css       # 主样式
│   ├── projects.css    # 项目页面样式
│   └── variables.css   # CSS变量
├── js/                 # JavaScript文件
│   ├── main.js         # 主脚本
│   └── projects.js     # 项目相关脚本
├── data/               # 数据文件
│   └── projects.json   # 项目数据
├── assets/             # 资源文件
│   ├── images/         # 图片
│   │   └── projects/   # 项目图片
│   └── icons/          # 图标
└── README.md           # 项目说明
```

## 如何使用

### 1. 本地预览

直接在浏览器中打开 `index.html` 文件即可预览网站。

### 2. 添加新项目

1. **创建项目页面**: 复制 `projects/project-template.html` 并修改内容
2. **更新项目数据**: 编辑 `data/projects.json` 文件，添加新项目信息
3. **添加项目图片**: 将项目图片放入 `assets/images/projects/` 目录

### 3. 部署到GitHub Pages

1. 在GitHub上创建新仓库
2. 将项目文件推送到仓库
3. 在仓库设置中启用GitHub Pages
4. 选择 `main` 分支作为源
5. 等待部署完成，获取访问URL

## 技术栈

- **HTML5**: 语义化标记
- **CSS3**: 现代样式技术
- **JavaScript**: 基础交互功能
- **Font Awesome**: 图标库
- **GitHub Pages**: 部署平台

## 维护指南

### 更新个人信息

编辑 `index.html` 文件中的个人简介部分。

### 更新技能列表

编辑 `index.html` 文件中的技能部分。

### 更新项目

1. 编辑 `data/projects.json` 文件添加或修改项目信息
2. 为新项目创建对应的HTML文件

### 更新样式

1. 修改 `css/variables.css` 文件调整颜色、字体等变量
2. 修改 `css/style.css` 文件调整布局和样式

## 示例项目

本项目包含一个示例项目页面 `projects/project1.html`，可作为参考。

## 许可证

MIT License