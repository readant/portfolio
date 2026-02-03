# 个人作品集网站

一个美观、响应式的个人作品集网站，采用国风墨画风格设计，用于展示个人项目和技能。

## 项目特点

- **响应式设计**: 适配桌面和移动设备
- **国风墨画风格**: 传统中国水墨画美学，包括宣纸质感、墨色晕染效果
- **现代UI**: 简洁、美观的用户界面，融合传统与现代元素
- **易于维护**: 清晰的目录结构和代码组织
- **动态内容**: 使用JavaScript动态加载项目数据
- **GitHub Pages部署**: 免费、简单的部署方案
- **传统装饰元素**: 印章、线条、水墨纹理等传统装饰

## 目录结构

```
portfolio/
├── index.html          # 首页
├── projects/           # 项目页面
│   ├── project-template.html # 项目模板
│   ├── portfolio-website/     # 响应式作品集网站项目
│   │   └── index.html         # 项目首页
│   └── christmas-tree/        # 圣诞树3D交互项目
│       └── index.html         # 项目首页
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
│   │   ├── projects/   # 项目图片
│   │   └── avatar.png  # 个人头像
│   └── icons/          # 图标
└── README.md           # 项目说明
```

## 如何使用

### 1. 本地预览

直接在浏览器中打开 `index.html` 文件即可预览网站。

### 2. 添加新项目

1. **创建项目文件夹**: 在 `projects/` 目录下创建新的项目文件夹，例如 `projects/new-project/`
2. **创建项目页面**: 复制 `projects/project-template.html` 到新创建的文件夹中，并命名为 `index.html`
3. **更新项目数据**: 编辑 `data/projects.json` 文件，添加新项目信息，设置正确的 `link` 路径（例如 `"link": "projects/new-project/index.html"`）
4. **添加项目图片**: 将项目图片放入 `assets/images/projects/` 目录，或在项目文件夹中创建 `images` 子目录

### 3. 部署到GitHub Pages

1. 在GitHub上创建新仓库
2. 将项目文件推送到仓库
3. 在仓库设置中启用GitHub Pages
4. 选择 `main` 分支作为源
5. 等待部署完成，获取访问URL

## 技术栈

- **HTML5**: 语义化标记
- **CSS3**: 现代样式技术，包括CSS变量、渐变、动画
- **JavaScript**: 基础交互功能，动态数据加载
- **Font Awesome**: 图标库
- **GitHub Pages**: 部署平台
- **Noto Serif SC**: 中文衬线字体，用于传统书法效果

## 国风墨画风格说明

本项目采用传统中国水墨画美学设计，主要特点包括：

### 视觉元素
- **宣纸质感**: 米黄色背景，模拟传统宣纸
- **墨色晕染**: 使用CSS渐变和透明度创建水墨晕染效果
- **印章装饰**: 传统红色印章元素，带有旋转效果
- **线条装饰**: 渐变线条，模拟传统画卷边框
- **水墨纹理**: 背景网格和径向渐变，模拟水墨纹理

### 色彩方案
- **主色调**: 米黄色 (#f7f2e8)，模拟宣纸
- **墨色**: 深灰色系列，从深到浅
- **强调色**: 棕色 (#8b4513)，模拟印章红色
- **辅助色**: 淡绿色 (#6a7b35)，模拟竹青

### 字体选择
- **主要字体**: Noto Serif SC，中文衬线字体，模拟传统书法
- **辅助字体**: KaiTi, SimSun，系统默认中文字体

## 维护指南

### 更新个人信息

编辑 `index.html` 文件中的个人简介部分。

### 更新技能列表

编辑 `index.html` 文件中的技能部分，可添加或修改技能卡片。

### 更新项目

1. 编辑 `data/projects.json` 文件添加或修改项目信息
2. 为新项目创建对应的HTML文件
3. 如需添加到导航栏，修改 `index.html` 文件

### 更新样式

1. **修改颜色方案**: 编辑 `css/variables.css` 文件中的CSS变量
2. **调整布局**: 修改 `css/style.css` 文件中的布局样式
3. **增强水墨效果**: 调整CSS渐变和透明度设置

### 添加新的装饰元素

1. 编辑 `index.html` 文件添加新的装饰元素
2. 在 `css/style.css` 文件中添加对应的样式

## 示例项目

本项目包含以下示例项目：

- **项目1**: `projects/project1.html` - 示例项目页面
- **圣诞树**: `projects/圣诞树.html` - 3D交互式圣诞树项目

## 许可证

MIT License