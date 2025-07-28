<template>
  <div class="blog-post">
    <div class="container">
      <article v-if="post" class="post-content">
        <!-- 文章头部 -->
        <header class="post-header">
          <div class="post-breadcrumb">
            <router-link to="/blog" class="breadcrumb-link">博客</router-link>
            <span class="breadcrumb-separator">></span>
            <span class="breadcrumb-current">{{ post.title }}</span>
          </div>
          
          <h1 class="post-title">{{ post.title }}</h1>
          
          <div class="post-meta">
            <div class="meta-left">
              <span class="post-date">{{ formatDate(post.date) }}</span>
              <span class="post-category">{{ post.category }}</span>
              <span class="post-read-time">{{ post.readTime }} 分钟阅读</span>
            </div>
            <div class="meta-right">
              <span class="post-views">{{ post.views }} 阅读</span>
              <span class="post-comments">{{ post.comments }} 评论</span>
            </div>
          </div>
          
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </header>

        <!-- 文章图片 -->
        <div v-if="post.image" class="post-image">
          <img :src="post.image" :alt="post.title" />
        </div>

        <!-- 文章内容 -->
        <div class="post-body" v-html="post.content"></div>

        <!-- 文章底部 -->
        <footer class="post-footer">
          <div class="post-actions">
            <button class="action-btn like-btn" :class="{ active: isLiked }" @click="toggleLike">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>{{ post.likes }}</span>
            </button>
            
            <button class="action-btn share-btn" @click="sharePost">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
              </svg>
              分享
            </button>
          </div>
          
          <div class="post-navigation">
            <router-link 
              v-if="previousPost" 
              :to="`/blog/${previousPost.id}`" 
              class="nav-link prev-post"
            >
              <div class="nav-direction">上一篇</div>
              <div class="nav-title">{{ previousPost.title }}</div>
            </router-link>
            
            <router-link 
              v-if="nextPost" 
              :to="`/blog/${nextPost.id}`" 
              class="nav-link next-post"
            >
              <div class="nav-direction">下一篇</div>
              <div class="nav-title">{{ nextPost.title }}</div>
            </router-link>
          </div>
        </footer>
      </article>

      <!-- 评论区 -->
      <section class="comments-section">
        <h2 class="comments-title">评论 ({{ comments.length }})</h2>
        
        <!-- 评论表单 -->
        <form class="comment-form card" @submit.prevent="submitComment">
          <div class="form-group">
            <label for="comment-content">发表评论</label>
            <textarea 
              id="comment-content"
              v-model="newComment.content"
              placeholder="写下你的想法..."
              rows="4"
              required
            ></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="comment-name">姓名</label>
              <input 
                id="comment-name"
                v-model="newComment.name"
                type="text"
                placeholder="你的姓名"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="comment-email">邮箱</label>
              <input 
                id="comment-email"
                v-model="newComment.email"
                type="email"
                placeholder="你的邮箱"
                required
              />
            </div>
          </div>
          
          <button type="submit" class="submit-btn">发表评论</button>
        </form>
        
        <!-- 评论列表 -->
        <div class="comments-list">
          <div v-for="comment in comments" :key="comment.id" class="comment-item card">
            <div class="comment-avatar">
              <img :src="comment.avatar" :alt="comment.name" />
            </div>
            
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-name">{{ comment.name }}</span>
                <span class="comment-date">{{ formatDate(comment.date) }}</span>
              </div>
              
              <p class="comment-text">{{ comment.content }}</p>
              
              <div class="comment-actions">
                <button class="reply-btn" @click="replyToComment(comment.id)">
                  回复
                </button>
                <button 
                  class="like-comment-btn" 
                  :class="{ active: comment.isLiked }"
                  @click="toggleCommentLike(comment.id)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  {{ comment.likes }}
                </button>
              </div>
              
              <!-- 回复列表 -->
              <div v-if="comment.replies && comment.replies.length > 0" class="replies">
                <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
                  <div class="reply-avatar">
                    <img :src="reply.avatar" :alt="reply.name" />
                  </div>
                  <div class="reply-content">
                    <div class="reply-header">
                      <span class="reply-name">{{ reply.name }}</span>
                      <span class="reply-date">{{ formatDate(reply.date) }}</span>
                    </div>
                    <p class="reply-text">{{ reply.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 相关文章 -->
      <section class="related-posts section">
        <h2 class="section-title">相关文章</h2>
        <div class="related-grid">
          <article 
            v-for="relatedPost in relatedPosts" 
            :key="relatedPost.id"
            class="related-card card"
            @click="goToPost(relatedPost.id)"
          >
            <div class="related-image">
              <img :src="relatedPost.image" :alt="relatedPost.title" />
            </div>
            <div class="related-content">
              <h3>{{ relatedPost.title }}</h3>
              <p>{{ relatedPost.excerpt }}</p>
              <div class="related-meta">
                <span>{{ formatDate(relatedPost.date) }}</span>
                <span>{{ relatedPost.readTime }} 分钟阅读</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const post = ref(null)
const isLiked = ref(false)
const newComment = ref({
  content: '',
  name: '',
  email: ''
})

// 模拟文章数据
const posts = [
  {
    id: 1,
    title: 'Vue 3 Composition API 最佳实践',
    excerpt: '深入探讨Vue 3 Composition API的使用技巧和最佳实践，帮助开发者更好地组织代码。',
    content: `
      <h2>什么是 Composition API</h2>
      <p>Vue 3 的 Composition API 是一个新的 API 集合，它提供了一种更灵活的方式来组织组件逻辑。相比于 Options API，Composition API 让我们能够更好地复用逻辑，提高代码的可维护性。</p>
      
      <h2>基本用法</h2>
      <p>Composition API 的核心是 <code>setup()</code> 函数，它是组件的入口点。在 setup 函数中，我们可以使用各种响应式 API 来创建响应式数据和计算属性。</p>
      
      <pre><code>import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}</code></pre>

      <h2>最佳实践</h2>
      <h3>1. 逻辑复用</h3>
      <p>使用 Composition API，我们可以将相关的逻辑提取到可复用的函数中：</p>
      
      <pre><code>// useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    increment,
    decrement,
    reset
  }
}</code></pre>

      <h3>2. 响应式引用</h3>
      <p>正确使用 <code>ref</code> 和 <code>reactive</code>：</p>
      
      <ul>
        <li>对于基本类型，使用 <code>ref</code></li>
        <li>对于对象类型，可以使用 <code>reactive</code> 或 <code>ref</code></li>
        <li>在模板中访问 ref 时会自动解包，但在 JavaScript 中需要使用 <code>.value</code></li>
      </ul>

      <h2>总结</h2>
      <p>Composition API 为 Vue 3 带来了更强大的逻辑复用能力和更好的 TypeScript 支持。通过合理使用这些 API，我们可以写出更加清晰、可维护的代码。</p>
    `,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
    date: '2024-01-15',
    category: '前端开发',
    tags: ['Vue.js', 'JavaScript', 'Composition API'],
    views: 1250,
    comments: 23,
    readTime: 8,
    likes: 45
  }
  // 可以添加更多文章数据
]

const comments = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    content: '这篇文章写得很好，对 Composition API 的讲解很清晰，特别是逻辑复用的部分让我受益匪浅。',
    date: '2024-01-16',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: 11,
        name: '作者',
        content: '谢谢你的认可！如果有任何问题欢迎继续讨论。',
        date: '2024-01-16',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
      }
    ]
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    content: '代码示例很实用，已经在项目中尝试使用了。希望能看到更多关于 Vue 3 的进阶内容。',
    date: '2024-01-17',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e1b7b0?w=60&h=60&fit=crop&crop=face',
    likes: 3,
    isLiked: false,
    replies: []
  }
])

const relatedPosts = ref([
  {
    id: 2,
    title: 'TypeScript 进阶指南',
    excerpt: '从基础到进阶，全面介绍TypeScript的类型系统和高级特性。',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop',
    date: '2024-01-10',
    readTime: 12
  },
  {
    id: 5,
    title: 'React Hooks 深度解析',
    excerpt: '深入理解React Hooks的工作原理，掌握常用Hooks的使用技巧。',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    date: '2023-12-20',
    readTime: 9
  }
])

const previousPost = computed(() => {
  const currentId = parseInt(route.params.id)
  return posts.find(p => p.id === currentId - 1)
})

const nextPost = computed(() => {
  const currentId = parseInt(route.params.id)
  return posts.find(p => p.id === currentId + 1)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
  if (isLiked.value) {
    post.value.likes++
  } else {
    post.value.likes--
  }
}

const sharePost = () => {
  if (navigator.share) {
    navigator.share({
      title: post.value.title,
      text: post.value.excerpt,
      url: window.location.href
    })
  } else {
    // 复制链接到剪贴板
    navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板')
  }
}

const submitComment = () => {
  if (newComment.value.content.trim()) {
    const comment = {
      id: Date.now(),
      name: newComment.value.name,
      email: newComment.value.email,
      content: newComment.value.content,
      date: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face',
      likes: 0,
      isLiked: false,
      replies: []
    }
    
    comments.value.unshift(comment)
    
    // 重置表单
    newComment.value = {
      content: '',
      name: '',
      email: ''
    }
    
    // 更新文章评论数
    post.value.comments++
  }
}

const replyToComment = (commentId) => {
  // 实现回复功能
  console.log('Reply to comment:', commentId)
}

const toggleCommentLike = (commentId) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    comment.isLiked = !comment.isLiked
    if (comment.isLiked) {
      comment.likes++
    } else {
      comment.likes--
    }
  }
}

const goToPost = (id) => {
  router.push(`/blog/${id}`)
}

onMounted(() => {
  const postId = parseInt(route.params.id)
  post.value = posts.find(p => p.id === postId)
  
  if (!post.value) {
    router.push('/blog')
  }
})
</script>

<style lang="scss" scoped>
.blog-post {
  padding-top: var(--nav-height);
  max-width: 800px;
  margin: 0 auto;
}

.post-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;

  .breadcrumb-link {
    color: var(--primary-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .breadcrumb-separator {
    color: var(--text-secondary-light);

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }

  .breadcrumb-current {
    color: var(--text-secondary-light);

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.post-title {
  font-size: 2.5rem;
  color: var(--text-light);
  margin-bottom: 1.5rem;
  line-height: 1.2;

  .dark-mode & {
    color: var(--text-dark);
  }

  @include respond-to('md') {
    font-size: 3rem;
  }
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-light);
  flex-wrap: wrap;
  gap: 1rem;

  .dark-mode & {
    border-bottom-color: var(--border-dark);
  }
}

.meta-left, .meta-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
}

.post-date, .post-read-time, .post-views, .post-comments {
  color: var(--text-secondary-light);

  .dark-mode & {
    color: var(--text-secondary-dark);
  }
}

.post-category {
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-weight: 500;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;

  .tag {
    padding: 0.5rem 1rem;
    background: var(--bg-secondary-light);
    color: var(--text-secondary-light);
    border-radius: 1rem;
    text-decoration: none;
    transition: all 0.3s ease;

    .dark-mode & {
      background: var(--bg-secondary-dark);
      color: var(--text-secondary-dark);
    }

    &:hover {
      background: var(--primary-color);
      color: white;
    }
  }
}

.post-image {
  margin-bottom: 3rem;

  img {
    width: 100%;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-light);

    .dark-mode & {
      box-shadow: var(--shadow-dark);
    }
  }
}

.post-body {
  color: var(--text-light);
  line-height: 1.8;
  font-size: 1.125rem;

  .dark-mode & {
    color: var(--text-dark);
  }

  h2, h3, h4, h5, h6 {
    margin: 2rem 0 1rem;
    color: var(--text-light);

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  h2 {
    font-size: 1.875rem;
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  pre {
    background: var(--bg-secondary-light);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    overflow-x: auto;
    margin: 2rem 0;

    .dark-mode & {
      background: var(--bg-secondary-dark);
    }

    code {
      font-family: var(--font-mono);
      font-size: 0.875rem;
      line-height: 1.6;
    }
  }

  code {
    background: var(--bg-secondary-light);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 0.875rem;

    .dark-mode & {
      background: var(--bg-secondary-dark);
    }
  }

  blockquote {
    border-left: 4px solid var(--primary-color);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: var(--text-secondary-light);

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.post-footer {
  margin: 3rem 0;
  padding: 2rem 0;
  border-top: 1px solid var(--border-light);

  .dark-mode & {
    border-top-color: var(--border-dark);
  }
}

.post-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

.post-navigation {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @include respond-to('md') {
    grid-template-columns: 1fr 1fr;
  }
}

.nav-link {
  display: block;
  padding: 1.5rem;
  background: var(--bg-secondary-light);
  border-radius: var(--border-radius);
  text-decoration: none;
  transition: all 0.3s ease;

  .dark-mode & {
    background: var(--bg-secondary-dark);
  }

  &:hover {
    background: var(--primary-color);
    color: white;

    .nav-direction, .nav-title {
      color: white;
    }
  }

  &.next-post {
    text-align: right;
  }
}

.nav-direction {
  font-size: 0.875rem;
  color: var(--text-secondary-light);
  margin-bottom: 0.5rem;

  .dark-mode & {
    color: var(--text-secondary-dark);
  }
}

.nav-title {
  font-weight: 600;
  color: var(--text-light);

  .dark-mode & {
    color: var(--text-dark);
  }
}

.comments-section {
  margin: 4rem 0;
}

.comments-title {
  color: var(--text-light);
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-color);

  .dark-mode & {
    color: var(--text-dark);
  }
}

.comment-form {
  margin-bottom: 3rem;

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-light);
      font-weight: 500;

      .dark-mode & {
        color: var(--text-dark);
      }
    }

    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid var(--border-light);
      border-radius: var(--border-radius);
      background: var(--bg-light);
      color: var(--text-light);
      font-size: 1rem;
      transition: border-color 0.3s ease;

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

    textarea {
      resize: vertical;
      min-height: 120px;
    }
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @include respond-to('md') {
      grid-template-columns: 1fr 1fr;
    }
  }

  .submit-btn {
    padding: 0.75rem 2rem;
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
}

.comment-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
}

.comment-avatar {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  .comment-name {
    font-weight: 600;
    color: var(--text-light);

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  .comment-date {
    font-size: 0.875rem;
    color: var(--text-secondary-light);

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.comment-text {
  color: var(--text-secondary-light);
  line-height: 1.6;
  margin-bottom: 1rem;

  .dark-mode & {
    color: var(--text-secondary-dark);
  }
}

.comment-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.reply-btn, .like-comment-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: transparent;
  color: var(--text-secondary-light);
  cursor: pointer;
  transition: color 0.3s ease;

  .dark-mode & {
    color: var(--text-secondary-dark);
  }

  &:hover {
    color: var(--primary-color);
  }

  &.active {
    color: var(--primary-color);
  }
}

.replies {
  margin-top: 1.5rem;
  padding-left: 2rem;
  border-left: 2px solid var(--border-light);

  .dark-mode & {
    border-left-color: var(--border-dark);
  }
}

.reply-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.reply-avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  .reply-name {
    font-weight: 600;
    color: var(--text-light);
    font-size: 0.875rem;

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  .reply-date {
    font-size: 0.75rem;
    color: var(--text-secondary-light);

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.reply-text {
  color: var(--text-secondary-light);
  line-height: 1.6;
  font-size: 0.875rem;

  .dark-mode & {
    color: var(--text-secondary-dark);
  }
}

.related-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }
}

.related-card {
  display: flex;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.2);
  }
}

.related-image {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  border-radius: var(--border-radius);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.related-content {
  flex: 1;

  h3 {
    color: var(--text-light);
    font-size: 1rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  p {
    color: var(--text-secondary-light);
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }

  .related-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    color: var(--text-secondary-light);

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}
</style> 