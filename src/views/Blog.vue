<template>
  <div class="blog">
    <div class="container">
      <!-- 页面标题 -->
      <section class="blog-header section">
        <h1 class="page-title fade-in-up">技术博客</h1>
        <p class="page-description fade-in-up">
          分享我在开发过程中的经验、心得和技术探索，记录成长的每一步。
        </p>
      </section>

      <!-- 搜索和筛选 -->
      <section class="blog-controls">
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索文章..." 
            class="search-input"
          />
          <button class="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </div>
        
        <div class="filter-controls">
          <select v-model="selectedCategory" class="category-select">
            <option value="">所有分类</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
          
          <select v-model="selectedTag" class="tag-select">
            <option value="">所有标签</option>
            <option v-for="tag in tags" :key="tag" :value="tag">
              {{ tag }}
            </option>
          </select>
        </div>
      </section>

      <!-- 主要内容区域 -->
      <div class="blog-main">
        <!-- 文章列表 -->
        <section class="blog-content section">
          <div class="blog-grid">
            <article 
              v-for="post in filteredPosts" 
              :key="post.id" 
              class="blog-card card"
              @click="goToPost(post.id)"
            >
            <div class="blog-image">
              <img :src="post.image" :alt="post.title" />
              <div class="blog-overlay">
                <span class="read-time">{{ post.readTime }} 分钟阅读</span>
              </div>
            </div>
            
            <div class="blog-content-area">
              <div class="blog-meta">
                <span class="blog-date">{{ formatDate(post.date) }}</span>
                <span class="blog-category">{{ post.category }}</span>
              </div>
              
              <h2 class="blog-title">{{ post.title }}</h2>
              <p class="blog-excerpt">{{ post.excerpt }}</p>
              
              <div class="blog-tags">
                <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              
              <div class="blog-footer">
                <div class="blog-stats">
                  <span class="stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    {{ post.views }}
                  </span>
                  <span class="stat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                    {{ post.comments }}
                  </span>
                </div>
                <button class="read-more-btn">阅读全文</button>
              </div>
            </div>
          </article>
        </div>
        
        <!-- 分页 -->
        <div v-if="totalPages > 1" class="pagination">
          <button 
            :disabled="currentPage === 1" 
            @click="goToPage(currentPage - 1)"
            class="page-btn"
          >
            上一页
          </button>
          
          <div class="page-numbers">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              :class="['page-number', { active: page === currentPage }]"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            :disabled="currentPage === totalPages" 
            @click="goToPage(currentPage + 1)"
            class="page-btn"
          >
            下一页
          </button>
          </div>
        </section>
        
        <!-- 热门文章侧边栏 -->
        <aside class="blog-sidebar">
          <div class="sidebar-section card">
            <h3>热门文章</h3>
            <div class="popular-posts">
              <div 
                v-for="post in popularPosts" 
                :key="post.id" 
                class="popular-post"
                @click="goToPost(post.id)"
              >
                <div class="popular-post-image">
                  <img :src="post.image" :alt="post.title" />
                </div>
                <div class="popular-post-content">
                  <h4>{{ post.title }}</h4>
                  <div class="popular-post-meta">
                    <span>{{ formatDate(post.date) }}</span>
                    <span>{{ post.views }} 阅读</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="sidebar-section card">
            <h3>标签云</h3>
            <div class="tag-cloud">
              <button 
                v-for="tag in tagCloud" 
                :key="tag.name"
                :class="['cloud-tag', `size-${tag.size}`]"
                @click="filterByTag(tag.name)"
              >
                {{ tag.name }}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedTag = ref('')
const currentPage = ref(1)
const postsPerPage = 6

const posts = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 最佳实践',
    excerpt: '深入探讨Vue 3 Composition API的使用技巧和最佳实践，帮助开发者更好地组织代码，提高开发效率。',
    content: '完整的文章内容...',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
    date: '2024-01-15',
    category: '前端开发',
    tags: ['Vue.js', 'JavaScript', 'Composition API'],
    views: 1250,
    comments: 23,
    readTime: 8
  },
  {
    id: 2,
    title: 'TypeScript 进阶指南',
    excerpt: '从基础到进阶，全面介绍TypeScript的类型系统和高级特性，让你的代码更加健壮。',
    content: '完整的文章内容...',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop',
    date: '2024-01-10',
    category: '编程语言',
    tags: ['TypeScript', '类型系统', '编程语言'],
    views: 980,
    comments: 15,
    readTime: 12
  },
  {
    id: 3,
    title: '现代CSS布局技巧',
    excerpt: '介绍Grid、Flexbox等现代CSS布局方法，让你的页面布局更加灵活和响应式。',
    content: '完整的文章内容...',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
    date: '2024-01-05',
    category: '前端开发',
    tags: ['CSS', '布局', '响应式设计'],
    views: 756,
    comments: 8,
    readTime: 6
  },
  {
    id: 4,
    title: 'Node.js 性能优化实战',
    excerpt: '分享Node.js应用性能优化的实用技巧，包括内存管理、异步处理等方面的优化策略。',
    content: '完整的文章内容...',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
    date: '2023-12-28',
    category: '后端开发',
    tags: ['Node.js', '性能优化', '后端'],
    views: 1100,
    comments: 31,
    readTime: 10
  },
  {
    id: 5,
    title: 'React Hooks 深度解析',
    excerpt: '深入理解React Hooks的工作原理，掌握useState、useEffect等常用Hooks的使用技巧。',
    content: '完整的文章内容...',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    date: '2023-12-20',
    category: '前端开发',
    tags: ['React', 'Hooks', 'JavaScript'],
    views: 890,
    comments: 19,
    readTime: 9
  },
  {
    id: 6,
    title: 'Docker 容器化部署指南',
    excerpt: '从基础到实战，学习如何使用Docker进行应用容器化部署，提高开发和运维效率。',
    content: '完整的文章内容...',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop',
    date: '2023-12-15',
    category: '运维部署',
    tags: ['Docker', '容器化', '部署'],
    views: 650,
    comments: 12,
    readTime: 15
  }
])

const categories = computed(() => {
  return [...new Set(posts.value.map(post => post.category))]
})

const tags = computed(() => {
  return [...new Set(posts.value.flatMap(post => post.tags))]
})

const filteredPosts = computed(() => {
  let filtered = posts.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(post => post.category === selectedCategory.value)
  }

  if (selectedTag.value) {
    filtered = filtered.filter(post => post.tags.includes(selectedTag.value))
  }

  // 分页
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  let filtered = posts.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(post => post.category === selectedCategory.value)
  }

  if (selectedTag.value) {
    filtered = filtered.filter(post => post.tags.includes(selectedTag.value))
  }

  return Math.ceil(filtered.length / postsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  let start = Math.max(1, current - 2)
  let end = Math.min(total, current + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const popularPosts = computed(() => {
  return posts.value
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
})

const tagCloud = computed(() => {
  const tagCounts = {}
  posts.value.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  const maxCount = Math.max(...Object.values(tagCounts))
  
  return Object.entries(tagCounts).map(([name, count]) => ({
    name,
    count,
    size: Math.ceil((count / maxCount) * 3) // 1-3 的大小等级
  }))
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goToPost = (id) => {
  router.push(`/blog/${id}`)
}

const goToPage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const filterByTag = (tag) => {
  selectedTag.value = tag
  currentPage.value = 1
}

onMounted(() => {
  // 可以在这里加载博客数据
})
</script>

<style lang="scss" scoped>
.blog {
  padding-top: var(--nav-height);
}

.blog-main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @include respond-to('lg') {
    grid-template-columns: 2fr 1fr;
  }
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

.blog-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;

  @include respond-to('md') {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.search-box {
  display: flex;
  position: relative;
  max-width: 400px;

  .search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid var(--border-light);
    border-radius: var(--border-radius);
    background: var(--bg-light);
    color: var(--text-light);
    font-size: 1rem;

    .dark-mode & {
      border-color: var(--border-dark);
      background: var(--bg-dark);
      color: var(--text-dark);
    }

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }

  .search-btn {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.5rem;
    border: none;
    background: transparent;
    color: var(--text-secondary-light);
    cursor: pointer;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }

    &:hover {
      color: var(--primary-color);
    }
  }
}

.filter-controls {
  display: flex;
  gap: 1rem;

  select {
    padding: 0.75rem 1rem;
    border: 2px solid var(--border-light);
    border-radius: var(--border-radius);
    background: var(--bg-light);
    color: var(--text-light);
    cursor: pointer;

    .dark-mode & {
      border-color: var(--border-dark);
      background: var(--bg-dark);
      color: var(--text-dark);
    }

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
}

.blog-main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @include respond-to('md') {
    grid-template-columns: 3fr 1fr;
  }
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
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px -8px rgba(0, 0, 0, 0.2);
  }
}

.blog-image {
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .blog-overlay {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.blog-content-area {
  padding: 2rem;
}

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

.blog-title {
  color: var(--text-light);
  margin-bottom: 1rem;
  font-size: 1.25rem;
  line-height: 1.4;

  .dark-mode & {
    color: var(--text-dark);
  }
}

.blog-excerpt {
  color: var(--text-secondary-light);
  line-height: 1.6;
  margin-bottom: 1.5rem;

  .dark-mode & {
    color: var(--text-secondary-dark);
  }
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  .tag {
    padding: 0.25rem 0.75rem;
    background: var(--bg-secondary-light);
    color: var(--text-secondary-light);
    border-radius: 1rem;
    font-size: 0.875rem;

    .dark-mode & {
      background: var(--bg-secondary-dark);
      color: var(--text-secondary-dark);
    }
  }
}

.blog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-stats {
  display: flex;
  gap: 1rem;

  .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary-light);
    font-size: 0.875rem;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.read-more-btn {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-1px);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.page-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--border-light);
  background: var(--bg-light);
  color: var(--text-light);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;

  .dark-mode & {
    border-color: var(--border-dark);
    background: var(--bg-dark);
    color: var(--text-dark);
  }

  &:hover:not(:disabled) {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 40px;
  height: 40px;
  border: 2px solid var(--border-light);
  background: var(--bg-light);
  color: var(--text-light);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  .dark-mode & {
    border-color: var(--border-dark);
    background: var(--bg-dark);
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

.blog-sidebar {
  display: none;
  height: fit-content;
  position: sticky;
  top: calc(var(--nav-height) + 2rem);

  @include respond-to('lg') {
    display: block;
  }
}

.sidebar-section {
  margin-bottom: 2rem;

  h3 {
    color: var(--text-light);
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary-color);

    .dark-mode & {
      color: var(--text-dark);
    }
  }
}

.popular-post {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  transition: all 0.3s ease;

  .dark-mode & {
    border-bottom-color: var(--border-dark);
  }

  &:hover {
    background: var(--bg-secondary-light);

    .dark-mode & {
      background: var(--bg-secondary-dark);
    }
  }

  &:last-child {
    border-bottom: none;
  }
}

.popular-post-image {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.popular-post-content {
  flex: 1;

  h4 {
    color: var(--text-light);
    font-size: 0.875rem;
    line-height: 1.4;
    margin-bottom: 0.5rem;

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  .popular-post-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    color: var(--text-secondary-light);

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cloud-tag {
  padding: 0.5rem 1rem;
  border: none;
  background: var(--bg-secondary-light);
  color: var(--text-secondary-light);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  .dark-mode & {
    background: var(--bg-secondary-dark);
    color: var(--text-secondary-dark);
  }

  &:hover {
    background: var(--primary-color);
    color: white;
  }

  &.size-1 {
    font-size: 0.875rem;
  }

  &.size-2 {
    font-size: 1rem;
  }

  &.size-3 {
    font-size: 1.125rem;
    font-weight: 600;
  }
}
</style> 