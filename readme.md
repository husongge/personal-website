# 个人简历网站

基于Vue 3构建的现代化个人简历网站，包含完整的功能模块和响应式设计。

## 🌟 项目特色

- ✨ **现代化设计** - 简洁美观的界面设计
- 📱 **响应式布局** - 完美适配各种设备
- 🌙 **暗黑模式** - 支持明暗主题切换
- 🌍 **多语言支持** - 中英文双语切换
- 🎨 **动画效果** - 流畅的页面过渡动画
- 📝 **博客系统** - 完整的文章发布和评论功能
- 💼 **项目展示** - 精美的作品集展示
- 📧 **联系表单** - 功能完整的联系方式页面

## 🛠 技术栈

### 前端框架
- **Vue 3** - 渐进式JavaScript框架
- **Vue Router** - 官方路由管理器
- **Pinia** - 状态管理
- **Vue I18n** - 国际化支持

### 构建工具
- **Vite** - 下一代前端构建工具
- **Sass** - CSS预处理器

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化

## 📁 项目结构

```
personal-portfolio/
├── public/                 # 静态资源
├── src/
│   ├── components/        # 公共组件
│   │   └── layout/       # 布局组件
│   ├── views/            # 页面组件
│   ├── router/           # 路由配置
│   ├── stores/           # 状态管理
│   ├── styles/           # 全局样式
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── package.json         # 项目配置
├── vite.config.js      # Vite配置
└── README.md           # 项目说明
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

构建文件将输出到 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

## 📄 页面说明

### 🏠 首页 (Home)
- Hero区域展示个人信息
- 技能专长展示
- 精选项目预览
- 最新博客文章

### 👨‍💻 关于我 (About)
- 详细个人介绍
- 专业技能展示
- 工作经历时间线
- 教育背景和证书
- 兴趣爱好

### 💼 项目展示 (Portfolio)
- 项目分类筛选
- 项目详情模态框
- 技术栈标签
- 在线演示和源码链接

### 📝 博客 (Blog)
- 文章列表和搜索
- 分类和标签筛选
- 文章详情页面
- 评论系统
- 相关文章推荐

### 📧 联系方式 (Contact)
- 联系表单
- 社交媒体链接
- 服务项目介绍
- 常见问题FAQ

## 🎨 自定义配置

### 主题颜色

在 `src/styles/variables.scss` 中修改主色调：

```scss
:root {
  --primary-color: #3b82f6;  // 修改为你喜欢的颜色
  --primary-dark: #2563eb;
  --primary-light: #60a5fa;
}
```

### 个人信息

在 `src/main.js` 中修改多语言配置：

```javascript
const messages = {
  zh: {
    hero: {
      name: '你的名字',
      subtitle: '你的职业',
      description: '你的简介'
    }
  }
}
```

### 添加新页面

1. 在 `src/views/` 目录下创建新的Vue组件
2. 在 `src/router/index.js` 中添加路由配置
3. 在导航栏组件中添加链接

## 🔧 开发指南

### 代码规范

项目使用ESLint和Prettier进行代码规范检查：

```bash
# 检查代码规范
npm run lint

# 自动修复代码格式
npm run lint --fix
```

### 组件开发

- 使用Vue 3 Composition API
- 遵循单文件组件(SFC)规范
- 使用`<script setup>`语法糖
- 样式使用Sass和scoped作用域

### 响应式设计

项目使用Sass mixins实现响应式设计：

```scss
.component {
  // 移动端样式
  
  @include respond-to('md') {
    // 平板样式
  }
  
  @include respond-to('lg') {
    // 桌面样式
  }
}
```

## 📱 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 🤝 贡献指南

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

如果你有任何问题或建议，欢迎联系：

- 邮箱：your.email@example.com
- GitHub：[@yourusername](https://github.com/yourusername)
- 个人网站：[https://yourwebsite.com](https://yourwebsite.com)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！