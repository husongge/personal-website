<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-main">
            <div class="hero-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face" alt="头像" />
            </div>
            
            <div class="hero-info">
              <h1 class="hero-name">{{ $t('hero.name') }}</h1>
              <h2 class="hero-title">{{ $t('hero.subtitle') }}</h2>
              <p class="hero-description">{{ $t('hero.description') }}</p>
              
              <div class="hero-actions">
                <router-link to="/portfolio" class="btn btn-primary">
                  查看作品
                </router-link>
                <router-link to="/contact" class="btn btn-outline">
                  联系我
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能展示 -->
    <section class="skills section">
      <div class="container">
        <h2 class="section-title">技能专长</h2>
        <div class="skills-grid">
          <div v-for="skill in skills" :key="skill.name" class="skill-card card">
            <div class="skill-icon">
              <i :class="skill.icon"></i>
            </div>
            <h3>{{ skill.name }}</h3>
            <p>{{ skill.description }}</p>
            <div class="skill-progress">
              <div class="progress-bar" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新项目 -->
    <section class="featured-projects section">
      <div class="container">
        <h2 class="section-title">精选项目</h2>
        <div class="projects-grid">
          <div v-for="project in featuredProjects" :key="project.id" class="project-card card">
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
              <div class="project-overlay">
                <a :href="project.demo" target="_blank" class="project-link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                  </svg>
                </a>
                <a :href="project.github" target="_blank" class="project-link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div class="project-content">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="section-footer">
          <router-link to="/portfolio" class="btn btn-outline">查看所有项目</router-link>
        </div>
      </div>
    </section>

    <!-- 博客预览 -->
    <section class="blog-preview section">
      <div class="container">
        <h2 class="section-title">最新文章</h2>
        <div class="blog-grid">
          <article v-for="post in latestPosts" :key="post.id" class="blog-card card">
            <div class="blog-meta">
              <span class="blog-date">{{ formatDate(post.date) }}</span>
              <span class="blog-category">{{ post.category }}</span>
            </div>
            <h3>
              <router-link :to="`/blog/${post.id}`">{{ post.title }}</router-link>
            </h3>
            <p>{{ post.excerpt }}</p>
            <div class="blog-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </article>
        </div>
        <div class="section-footer">
          <router-link to="/blog" class="btn btn-outline">查看所有文章</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const skills = ref([
  {
    name: '前端开发',
    description: '精通Vue.js、React、TypeScript等现代前端技术',
    icon: '🎨',
    level: 90
  },
  {
    name: '后端开发',
    description: '熟练使用Node.js、Python、数据库设计等',
    icon: '⚙️',
    level: 85
  },
  {
    name: 'UI/UX设计',
    description: '具备良好的设计感，注重用户体验',
    icon: '🎯',
    level: 75
  },
  {
    name: '移动开发',
    description: '掌握React Native、Flutter等跨平台开发',
    icon: '📱',
    level: 80
  }
])

const featuredProjects = ref([
  {
    id: 1,
    title: '个人博客系统',
    description: '基于Vue.js和Node.js构建的全栈博客平台，支持Markdown编辑、评论系统等功能。',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
    tags: ['Vue.js', 'Node.js', 'MongoDB'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/username/project'
  },
  {
    id: 2,
    title: '电商管理后台',
    description: '功能完整的电商后台管理系统，包含商品管理、订单处理、数据统计等模块。',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop',
    tags: ['React', 'TypeScript', 'Ant Design'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/username/project'
  },
  {
    id: 3,
    title: '移动端App',
    description: '跨平台移动应用，提供流畅的用户体验和丰富的交互功能。',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
    tags: ['React Native', 'Redux', 'Firebase'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/username/project'
  }
])

const latestPosts = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 最佳实践',
    excerpt: '深入探讨Vue 3 Composition API的使用技巧和最佳实践，帮助开发者更好地组织代码。',
    date: '2024-01-15',
    category: '前端开发',
    tags: ['Vue.js', 'JavaScript']
  },
  {
    id: 2,
    title: 'TypeScript 进阶指南',
    excerpt: '从基础到进阶，全面介绍TypeScript的类型系统和高级特性。',
    date: '2024-01-10',
    category: '编程语言',
    tags: ['TypeScript', '类型系统']
  },
  {
    id: 3,
    title: '现代CSS布局技巧',
    excerpt: '介绍Grid、Flexbox等现代CSS布局方法，让你的页面布局更加灵活。',
    date: '2024-01-05',
    category: '前端开发',
    tags: ['CSS', '布局']
  }
])

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
.home {
  padding-top: var(--nav-height);
}

.hero {
  min-height: 60vh;
  display: flex;
  align-items: center;
  padding: 3rem 0;
}

.hero-content {
  width: 100%;
  display: flex;
  justify-content: center;
}

.hero-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  
  @include respond-to('md') {
    flex-direction: row;
    text-align: left;
    gap: 2rem;
  }
}

.hero-avatar {
  margin-bottom: 2rem;
  
  @include respond-to('md') {
    margin-bottom: 0;
    flex-shrink: 0;
  }
  
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--border-light);
    box-shadow: var(--shadow-card);
  }
}

.hero-info {
  flex: 1;
}

.hero-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-light);
  
  @include respond-to('md') {
    font-size: 2.5rem;
  }
}

.hero-title {
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--text-secondary-light);
  margin-bottom: 1rem;
  
  @include respond-to('md') {
    font-size: 1.5rem;
  }
}

.hero-description {
  font-size: 1rem;
  color: var(--text-secondary-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @include respond-to('md') {
    justify-content: flex-start;
  }
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(4, 1fr);
  }
}

.skill-card {
  text-align: center;

  .skill-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 1rem;
    color: var(--text-light);

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  p {
    color: var(--text-secondary-light);
    margin-bottom: 1.5rem;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.skill-progress {
  background: var(--bg-secondary-light);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;

  .dark-mode & {
    background: var(--bg-secondary-dark);
  }

  .progress-bar {
    height: 100%;
    background: var(--primary-color);
    border-radius: 4px;
    transition: width 1s ease;
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
  overflow: hidden;
  padding: 0;

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
      gap: 1rem;
      opacity: 0;
      transition: opacity 0.3s ease;

      .project-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        text-decoration: none;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    &:hover {
      img {
        transform: scale(1.1);
      }

      .project-overlay {
        opacity: 1;
      }
    }
  }

  .project-content {
    padding: 2rem;

    h3 {
      margin-bottom: 1rem;
      color: var(--text-light);

      .dark-mode & {
        color: var(--text-dark);
      }
    }

    p {
      color: var(--text-secondary-light);
      margin-bottom: 1.5rem;

      .dark-mode & {
        color: var(--text-secondary-dark);
      }
    }
  }
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--primary-color);
  color: white;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.blog-grid {
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

.blog-card {
  .blog-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.875rem;

    .blog-date {
      color: var(--text-secondary-light);

      .dark-mode & {
        color: var(--text-secondary-dark);
      }
    }

    .blog-category {
      background: var(--primary-color);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-weight: 500;
    }
  }

  h3 {
    margin-bottom: 1rem;

    a {
      color: var(--text-light);
      text-decoration: none;
      transition: color 0.3s ease;

      .dark-mode & {
        color: var(--text-dark);
      }

      &:hover {
        color: var(--primary-color);
      }
    }
  }

  p {
    color: var(--text-secondary-light);
    margin-bottom: 1.5rem;
    line-height: 1.6;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .tag {
    background: var(--bg-secondary-light);
    color: var(--text-secondary-light);

    .dark-mode & {
      background: var(--bg-secondary-dark);
      color: var(--text-secondary-dark);
    }
  }
}

.section-footer {
  text-align: center;
  margin-top: 3rem;
}
</style> 