<template>
  <div class="portfolio">
    <div class="container">
      <!-- 页面标题 -->
      <section class="portfolio-header section">
        <h1 class="page-title fade-in-up">项目展示</h1>
        <p class="page-description fade-in-up">
          这里展示了我参与开发的一些项目，涵盖了Web应用、移动应用、开源项目等多个领域。
          每个项目都体现了我在不同技术栈上的实践和探索。
        </p>
      </section>

      <!-- 项目筛选 -->
      <section class="portfolio-filter">
        <div class="filter-tabs">
          <button 
            v-for="category in categories" 
            :key="category.key"
            :class="['filter-tab', { active: activeCategory === category.key }]"
            @click="setActiveCategory(category.key)"
          >
            {{ category.name }}
          </button>
        </div>
      </section>

      <!-- 项目网格 -->
      <section class="projects-grid-section section">
        <div class="projects-grid">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id" 
            class="project-card card"
            @click="openProjectModal(project)"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
              <div class="project-overlay">
                <div class="project-actions">
                  <a 
                    v-if="project.demo" 
                    :href="project.demo" 
                    target="_blank" 
                    class="project-action"
                    @click.stop
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                    </svg>
                    <span>预览</span>
                  </a>
                  <a 
                    v-if="project.github" 
                    :href="project.github" 
                    target="_blank" 
                    class="project-action"
                    @click.stop
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
                    </svg>
                    <span>代码</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <div class="project-header">
                <h3>{{ project.title }}</h3>
                <span class="project-status" :class="project.status">
                  {{ getStatusText(project.status) }}
                </span>
              </div>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <div class="project-meta">
                <span class="project-date">{{ formatDate(project.date) }}</span>
                <span class="project-category">{{ getCategoryName(project.category) }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 项目详情模态框 -->
    <div v-if="selectedProject" class="project-modal" @click="closeProjectModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeProjectModal">×</button>
        <div class="modal-header">
          <h2>{{ selectedProject.title }}</h2>
          <div class="modal-actions">
            <a 
              v-if="selectedProject.demo" 
              :href="selectedProject.demo" 
              target="_blank" 
              class="btn btn-primary"
            >
              在线预览
            </a>
            <a 
              v-if="selectedProject.github" 
              :href="selectedProject.github" 
              target="_blank" 
              class="btn btn-outline"
            >
              查看代码
            </a>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-image">
            <img :src="selectedProject.image" :alt="selectedProject.title" />
          </div>
          <div class="modal-details">
            <h3>项目描述</h3>
            <p>{{ selectedProject.fullDescription || selectedProject.description }}</p>
            
            <h3>技术栈</h3>
            <div class="tech-stack">
              <span v-for="tech in selectedProject.tags" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
            
            <h3>项目特点</h3>
            <ul class="project-features">
              <li v-for="feature in selectedProject.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
            
            <div class="project-info">
              <div class="info-item">
                <strong>开发时间：</strong>
                <span>{{ formatDate(selectedProject.date) }}</span>
              </div>
              <div class="info-item">
                <strong>项目状态：</strong>
                <span :class="selectedProject.status">{{ getStatusText(selectedProject.status) }}</span>
              </div>
              <div class="info-item">
                <strong>项目类型：</strong>
                <span>{{ getCategoryName(selectedProject.category) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')
const selectedProject = ref(null)

const categories = [
  { key: 'all', name: '全部' },
  { key: 'web', name: 'Web应用' },
  { key: 'mobile', name: '移动应用' },
  { key: 'opensource', name: '开源项目' },
  { key: 'tool', name: '工具库' }
]

const projects = ref([
  {
    id: 1,
    title: '个人博客系统',
    description: '基于Vue.js和Node.js构建的全栈博客平台，支持Markdown编辑、评论系统等功能。',
    fullDescription: '这是一个功能完整的个人博客系统，采用现代化的技术栈开发。前端使用Vue 3 + TypeScript，后端使用Node.js + Express，数据库使用MongoDB。系统支持文章发布、分类管理、标签系统、评论功能、用户认证等完整的博客功能。',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
    category: 'web',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
    status: 'completed',
    date: '2023-12-01',
    demo: 'https://blog.example.com',
    github: 'https://github.com/username/blog',
    features: [
      'Markdown编辑器支持',
      '响应式设计',
      '用户认证系统',
      '评论和点赞功能',
      'SEO优化',
      '后台管理系统'
    ]
  },
  {
    id: 2,
    title: '电商管理后台',
    description: '功能完整的电商后台管理系统，包含商品管理、订单处理、数据统计等模块。',
    fullDescription: '这是一个为中小型电商企业设计的后台管理系统。系统提供了完整的商品管理、库存管理、订单处理、客户管理、数据统计等功能。采用React + Ant Design构建，具有良好的用户体验和丰富的交互功能。',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop',
    category: 'web',
    tags: ['React', 'TypeScript', 'Ant Design', 'Redux', 'Chart.js'],
    status: 'completed',
    date: '2023-10-15',
    demo: 'https://admin.example.com',
    github: 'https://github.com/username/ecommerce-admin',
    features: [
      '商品管理系统',
      '订单处理流程',
      '数据可视化',
      '权限管理',
      '批量操作',
      '导出功能'
    ]
  },
  {
    id: 3,
    title: '移动端App',
    description: '跨平台移动应用，提供流畅的用户体验和丰富的交互功能。',
    fullDescription: '这是一个使用React Native开发的跨平台移动应用。应用集成了用户认证、内容浏览、社交分享、推送通知等功能。采用Redux进行状态管理，使用Firebase作为后端服务，支持iOS和Android双平台。',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
    category: 'mobile',
    tags: ['React Native', 'Redux', 'Firebase', 'iOS', 'Android'],
    status: 'completed',
    date: '2023-08-20',
    demo: 'https://app.example.com',
    github: 'https://github.com/username/mobile-app',
    features: [
      '跨平台支持',
      '离线功能',
      '推送通知',
      '社交分享',
      '用户认证',
      '实时同步'
    ]
  },
  {
    id: 4,
    title: 'Vue组件库',
    description: '基于Vue 3的UI组件库，提供丰富的组件和完善的文档。',
    fullDescription: '这是一个专为Vue 3设计的UI组件库项目。组件库包含常用的UI组件，如按钮、表单、表格、弹窗等，所有组件都支持TypeScript，具有完善的类型定义。项目还包含详细的文档站点和在线演示。',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
    category: 'opensource',
    tags: ['Vue.js', 'TypeScript', 'Vite', 'Storybook', 'Sass'],
    status: 'active',
    date: '2023-06-10',
    demo: 'https://ui.example.com',
    github: 'https://github.com/username/vue-ui',
    features: [
      '20+精美组件',
      'TypeScript支持',
      '主题定制',
      '完善文档',
      '单元测试',
      'Tree Shaking'
    ]
  },
  {
    id: 5,
    title: '数据可视化平台',
    description: '企业级数据可视化平台，支持多种图表类型和实时数据更新。',
    fullDescription: '这是一个企业级的数据可视化平台，帮助企业更好地理解和展示数据。平台支持多种数据源接入，提供丰富的图表类型，支持拖拽式操作，可以快速创建数据大屏和报表。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
    category: 'web',
    tags: ['Vue.js', 'D3.js', 'WebSocket', 'Python', 'PostgreSQL'],
    status: 'active',
    date: '2023-04-05',
    demo: 'https://dataviz.example.com',
    github: 'https://github.com/username/dataviz',
    features: [
      '多数据源支持',
      '实时数据更新',
      '拖拽式编辑',
      '丰富图表类型',
      '响应式设计',
      '数据导出'
    ]
  },
  {
    id: 6,
    title: '工具函数库',
    description: '常用JavaScript工具函数库，提供类型安全和完善的测试覆盖。',
    fullDescription: '这是一个JavaScript/TypeScript工具函数库，收集了开发中常用的工具函数。所有函数都有完整的TypeScript类型定义，100%的测试覆盖率，支持Tree Shaking，可以按需引入。',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=200&fit=crop',
    category: 'tool',
    tags: ['TypeScript', 'Jest', 'Rollup', 'ESLint', 'Prettier'],
    status: 'completed',
    date: '2023-02-15',
    demo: 'https://utils.example.com',
    github: 'https://github.com/username/utils',
    features: [
      '100+实用函数',
      'TypeScript支持',
      '100%测试覆盖',
      '按需引入',
      '详细文档',
      '持续维护'
    ]
  }
])

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') {
    return projects.value
  }
  return projects.value.filter(project => project.category === activeCategory.value)
})

const setActiveCategory = (category) => {
  activeCategory.value = category
}

const openProjectModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeProjectModal = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}

const getCategoryName = (category) => {
  const categoryMap = {
    web: 'Web应用',
    mobile: '移动应用',
    opensource: '开源项目',
    tool: '工具库'
  }
  return categoryMap[category] || category
}

const getStatusText = (status) => {
  const statusMap = {
    completed: '已完成',
    active: '进行中',
    planned: '计划中'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style lang="scss" scoped>
.portfolio {
  padding-top: var(--nav-height);
}

.page-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--primary-color);

  @include respond-to('md') {
    font-size: 3.5rem;
  }
}

.page-description {
  text-align: center;
  font-size: 1.125rem;
  color: var(--text-secondary-light);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  .dark-mode & {
    color: var(--text-secondary-dark);
  }
}

.portfolio-filter {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.filter-tab {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--border-light);
  background: transparent;
  color: var(--text-light);
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  .dark-mode & {
    border-color: var(--border-dark);
    color: var(--text-dark);
  }

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }

  &.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-card {
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.25);
  }
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-actions {
    display: flex;
    gap: 1rem;
  }

  .project-action {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: var(--border-radius);
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
    }
  }

  &:hover {
    img {
      transform: scale(1.05);
    }

    .project-overlay {
      opacity: 1;
    }
  }
}

.project-content {
  padding: 2rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;

  h3 {
    color: var(--text-light);
    margin: 0;
    flex: 1;

    .dark-mode & {
      color: var(--text-dark);
    }
  }
}

.project-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;

  &.completed {
    background: #10b981;
    color: white;
  }

  &.active {
    background: #f59e0b;
    color: white;
  }

  &.planned {
    background: #6b7280;
    color: white;
  }
}

.project-description {
  color: var(--text-secondary-light);
  line-height: 1.6;
  margin-bottom: 1.5rem;

  .dark-mode & {
    color: var(--text-secondary-dark);
  }
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--primary-color);
  color: white;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: var(--text-secondary-light);

  .dark-mode & {
    color: var(--text-secondary-dark);
  }

  .project-category {
    font-weight: 500;
    color: var(--primary-color);
  }
}

// 模态框样式
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.modal-content {
  background: var(--bg-light);
  border-radius: var(--border-radius);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  .dark-mode & {
    background: var(--bg-dark);
  }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: none;
  background: var(--bg-secondary-light);
  color: var(--text-light);
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;

  .dark-mode & {
    background: var(--bg-secondary-dark);
    color: var(--text-dark);
  }

  &:hover {
    background: var(--primary-color);
    color: white;
  }
}

.modal-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid var(--border-light);

  .dark-mode & {
    border-bottom-color: var(--border-dark);
  }

  h2 {
    margin-bottom: 1rem;
    color: var(--text-light);

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
  }
}

.modal-body {
  padding: 2rem;
}

.modal-image {
  margin-bottom: 2rem;

  img {
    width: 100%;
    border-radius: var(--border-radius);
  }
}

.modal-details {
  h3 {
    color: var(--text-light);
    margin: 2rem 0 1rem;

    .dark-mode & {
      color: var(--text-dark);
    }

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    color: var(--text-secondary-light);
    line-height: 1.6;
    margin-bottom: 1rem;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 500;
}

.project-features {
  list-style: none;
  padding: 0;

  li {
    position: relative;
    padding: 0.5rem 0 0.5rem 2rem;
    color: var(--text-secondary-light);

    .dark-mode & {
      color: var(--text-secondary-dark);
    }

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--primary-color);
      font-weight: bold;
    }
  }
}

.project-info {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);

  .dark-mode & {
    border-top-color: var(--border-dark);
  }
}

.info-item {
  display: flex;
  margin-bottom: 1rem;

  strong {
    min-width: 100px;
    color: var(--text-light);

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  span {
    color: var(--text-secondary-light);

    .dark-mode & {
      color: var(--text-secondary-dark);
    }

    &.completed {
      color: #10b981;
    }

    &.active {
      color: #f59e0b;
    }

    &.planned {
      color: #6b7280;
    }
  }
}
</style> 