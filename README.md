# 南开大学数学建模协会官方网站

一个现代化、响应式的数学建模协会官方网站，使用HTML、CSS和JavaScript构建。

## 功能特色

- ✨ **现代化设计**：采用主题色 #711a5f，界面美观大方
- 🌓 **白天/黑暗模式**：支持主题切换，用户体验更佳
- 🌍 **中英双语**：完整的多语言支持
- 📱 **响应式布局**：适配桌面、平板和手机设备
- 🎠 **轮播图展示**：首页支持左右切换的图片轮播
- 🧭 **完整导航**：首页、协会概况、协会建设、联系我们四个页面
- 📝 **联系表单**：功能完整的用户反馈表单
- ⚡ **流畅动画**：丰富的CSS动画和过渡效果

## 文件结构

```
NKUMMF_page/
├── index.html          # 首页
├── about.html          # 协会概况
├── organization.html   # 组织架构
├── youth-league.html   # 团支部
├── former-leaders.html # 历任负责人
├── development.html    # 协会建设
├── contact.html        # 联系我们
├── styles.css          # 样式文件
├── script.js           # 功能脚本
├── README.md           # 项目说明
├── 图片资源说明.md      # 图片资源指南
├── icon/              # 图标文件夹
│   ├── nkummf.jpg       # 网站logo
│   ├── favicon.ico    # 网站图标(需要创建)
│   └── ...
└── images/            # 图片资源文件夹
    ├── slide1.jpg     # 轮播图1(需要准备)
    ├── slide2.jpg     # 轮播图2(需要准备)
    ├── slide3.jpg     # 轮播图3(需要准备)
    ├── news1.jpg      # 新闻图片1(需要准备)
    ├── news2.jpg      # 新闻图片2(需要准备)
    ├── news3.jpg      # 新闻图片3(需要准备)
    ├── about-intro.jpg # 关于页面图片(需要准备)
    ├── activity1.jpg  # 活动图片1(需要准备)
    ├── activity2.jpg  # 活动图片2(需要准备)
    ├── activity3.jpg  # 活动图片3(需要准备)
    ├── activity4.jpg  # 活动图片4(需要准备)
    ├── organization.jpg # 组织架构图(需要准备)
    ├── youth-league.jpg # 团支部图片(需要准备)
    ├── league-activity1.jpg # 团支部活动1(需要准备)
    ├── league-activity2.jpg # 团支部活动2(需要准备)
    ├── league-activity3.jpg # 团支部活动3(需要准备)
    ├── leader1.jpg    # 历任负责人1(需要准备)
    ├── leader2.jpg    # 历任负责人2(需要准备)
    └── leader3.jpg    # 历任负责人3(需要准备)
```

## 使用方法

### 1. 预览网站

#### 方法一：直接打开HTML文件
1. 确保所有文件都在同一目录下
2. 双击 `index.html` 文件在浏览器中打开
3. 可以正常浏览各个页面，但某些功能可能受限

#### 方法二：使用本地服务器（推荐）
1. 安装 Python（如果没有的话）
2. 在项目目录下打开命令行/终端
3. 运行以下命令之一：
   ```bash
   # Python 3
   python -m http.server 8000
   
   # 或者使用 Python 2
   python -m SimpleHTTPServer 8000
   ```
4. 在浏览器中访问 `http://localhost:8000`

#### 方法三：使用 Live Server（VS Code 用户）
1. 在 VS Code 中安装 Live Server 扩展
2. 右键点击 `index.html` 文件
3. 选择 "Open with Live Server"

### 2. 图片资源准备

网站需要以下图片资源，请查看 `图片资源说明.md` 了解详细信息：

- **轮播图片**：3张高质量横向图片（推荐1920x1080）
- **新闻图片**：3张相关新闻配图（推荐800x600）
- **关于页面图片**：1张协会活动照片（推荐800x600）
- **活动图片**：4张不同活动的照片（推荐600x400）

### 3. 定制修改

#### 修改协会信息
- 编辑各HTML文件中的文本内容
- 修改联系方式（邮箱、电话、地址）
- 更新协会介绍和历史信息

#### 修改样式
- 在 `styles.css` 中修改主题色（搜索 `--primary-color`）
- 调整布局、字体、间距等样式属性

#### 添加功能
- 在 `script.js` 中添加新的JavaScript功能
- 可以集成更多第三方插件和API

## 技术特性

### CSS特性
- CSS变量（自定义属性）
- Flexbox和Grid布局
- 媒体查询响应式设计
- CSS动画和过渡效果
- 暗色主题支持

### JavaScript特性
- 原生JavaScript（无需框架）
- 模块化代码结构
- 本地存储用户偏好
- 触摸设备支持
- 滚动动画效果

### 浏览器兼容性
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 部署上线

### 1. 静态网站托管
可以部署到以下平台：
- GitHub Pages
- Netlify
- Vercel
- 阿里云OSS
- 腾讯云COS

### 2. 自己的服务器
- 上传所有文件到服务器
- 配置Web服务器（Apache/Nginx）
- 确保正确的文件权限

## 维护更新

### 定期更新内容
- 更新新闻动态
- 添加最新活动信息
- 修改联系方式和人员信息

### 性能优化
- 压缩图片文件
- 启用浏览器缓存
- 使用CDN加速

## 许可证

此项目基于 MIT 许可证开源，您可以自由使用、修改和分发。

## 技术支持

如有任何问题或建议，请联系：
- 邮箱：nkummf@nankai.edu.cn
- 在GitHub上提交Issue

---

**南开大学数学建模协会** © 2024 