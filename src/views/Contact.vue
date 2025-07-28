<template>
  <div class="contact">
    <div class="container">
      <!-- 页面标题 -->
      <section class="contact-header section">
        <h1 class="page-title fade-in-up">联系我</h1>
        <p class="page-description fade-in-up">
          有任何问题或合作意向，欢迎与我联系。我会尽快回复您的消息。
        </p>
      </section>

      <div class="contact-content">
        <!-- 联系表单 -->
        <section class="contact-form-section">
          <div class="form-container card">
            <h2>发送消息</h2>
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">姓名 *</label>
                  <input 
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label for="email">邮箱 *</label>
                  <input 
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="请输入您的邮箱"
                    required
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="subject">主题 *</label>
                <input 
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  placeholder="请输入消息主题"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="message">消息内容 *</label>
                <textarea 
                  id="message"
                  v-model="form.message"
                  placeholder="请输入您的消息内容..."
                  rows="6"
                  required
                ></textarea>
              </div>
              
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">发送消息</span>
                <span v-else>发送中...</span>
              </button>
            </form>
          </div>
        </section>

        <!-- 联系信息 -->
        <section class="contact-info-section">
          <!-- 联系方式 -->
          <div class="contact-info card">
            <h3>联系方式</h3>
            <div class="info-list">
              <div class="info-item">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <h4>邮箱</h4>
                  <p>your.email@example.com</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <h4>电话</h4>
                  <p>+86 123 4567 8900</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <h4>地址</h4>
                  <p>中国 · 北京市朝阳区</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <h4>工作时间</h4>
                  <p>周一至周五 9:00-18:00</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 社交媒体 -->
          <div class="social-media card">
            <h3>社交媒体</h3>
            <div class="social-links">
              <a href="https://github.com" target="_blank" class="social-link github">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              
              <a href="https://x.com" target="_blank" class="social-link twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X (Twitter)</span>
              </a>
              
              <a href="https://linkedin.com" target="_blank" class="social-link linkedin">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              
              <a href="mailto:your.email@example.com" class="social-link email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>发送邮件</span>
              </a>
            </div>
          </div>

          <!-- 技能服务 -->
          <div class="services card">
            <h3>服务项目</h3>
            <div class="services-list">
              <div class="service-item">
                <div class="service-icon">💻</div>
                <div class="service-content">
                  <h4>Web开发</h4>
                  <p>现代化的Web应用开发，包括前端和后端</p>
                </div>
              </div>
              
              <div class="service-item">
                <div class="service-icon">📱</div>
                <div class="service-content">
                  <h4>移动应用</h4>
                  <p>跨平台移动应用开发和原生应用开发</p>
                </div>
              </div>
              
              <div class="service-item">
                <div class="service-icon">🎨</div>
                <div class="service-content">
                  <h4>UI/UX设计</h4>
                  <p>用户界面设计和用户体验优化</p>
                </div>
              </div>
              
              <div class="service-item">
                <div class="service-icon">⚡</div>
                <div class="service-content">
                  <h4>性能优化</h4>
                  <p>网站性能优化和代码重构</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 常见问题 -->
      <section class="faq-section section">
        <h2 class="section-title">常见问题</h2>
        <div class="faq-list">
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item card">
            <button 
              class="faq-question" 
              @click="toggleFaq(index)"
              :class="{ active: activeFaq === index }"
            >
              <span>{{ faq.question }}</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                :class="{ rotated: activeFaq === index }"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </button>
            <div class="faq-answer" :class="{ active: activeFaq === index }">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const activeFaq = ref(null)

const faqs = ref([
  {
    question: '你主要使用哪些技术栈？',
    answer: '我主要使用Vue.js、React、Node.js、TypeScript等现代技术栈。对于数据库，我熟悉MongoDB、MySQL和PostgreSQL。同时也有Docker、AWS等运维部署经验。'
  },
  {
    question: '项目开发周期一般是多长？',
    answer: '项目周期取决于复杂度和需求。简单的展示网站通常1-2周，中等复杂度的Web应用2-4周，复杂的全栈项目可能需要1-3个月。具体时间会在需求分析后确定。'
  },
  {
    question: '是否提供项目维护服务？',
    answer: '是的，我提供项目上线后的维护服务，包括bug修复、功能更新、性能优化等。维护服务的具体内容和费用会根据项目规模协商确定。'
  },
  {
    question: '如何保证项目质量？',
    answer: '我遵循最佳实践，包括代码审查、单元测试、版本控制等。项目开发过程中会定期与客户沟通，确保需求理解准确。交付前会进行全面测试。'
  },
  {
    question: '是否可以远程合作？',
    answer: '当然可以。我有丰富的远程协作经验，使用Slack、钉钉等工具保持沟通，通过Git进行代码管理，定期进行视频会议讨论项目进展。'
  }
])

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // 模拟表单提交
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 这里应该调用实际的API
    console.log('Form submitted:', form.value)
    
    // 重置表单
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    alert('消息发送成功！我会尽快回复您。')
  } catch (error) {
    console.error('Submit error:', error)
    alert('发送失败，请稍后重试。')
  } finally {
    isSubmitting.value = false
  }
}

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}
</script>

<style lang="scss" scoped>
.contact {
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin: 3rem 0;

  @include respond-to('lg') {
    grid-template-columns: 2fr 1fr;
  }
}

.form-container {
  h2 {
    color: var(--text-light);
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--primary-color);

    .dark-mode & {
      color: var(--text-dark);
    }
  }
}

.contact-form {
  .form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @include respond-to('md') {
      grid-template-columns: 1fr 1fr;
    }
  }

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
      transition: all 0.3s ease;

      .dark-mode & {
        border-color: var(--border-dark);
        background: var(--bg-dark);
        color: var(--text-dark);
      }

      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      &::placeholder {
        color: var(--text-secondary-light);

        .dark-mode & {
          color: var(--text-secondary-dark);
        }
      }
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }
  }

  .submit-btn {
    width: 100%;
    padding: 1rem 2rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: var(--primary-dark);
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }
}

.contact-info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-info, .social-media, .services {
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

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .info-icon {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info-content {
    flex: 1;

    h4 {
      color: var(--text-light);
      margin-bottom: 0.5rem;
      font-size: 1.1rem;

      .dark-mode & {
        color: var(--text-dark);
      }
    }

    p {
      color: var(--text-secondary-light);
      line-height: 1.5;

      .dark-mode & {
        color: var(--text-secondary-dark);
      }
    }
  }
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary-light);
  color: var(--text-light);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;

  .dark-mode & {
    background: var(--bg-secondary-dark);
    color: var(--text-dark);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-light);

    .dark-mode & {
      box-shadow: var(--shadow-dark);
    }
  }

  &.github:hover {
    background: #333;
    color: white;
  }

  &.twitter:hover {
    background: #1da1f2;
    color: white;
  }

  &.linkedin:hover {
    background: #0077b5;
    color: white;
  }

  &.email:hover {
    background: var(--primary-color);
    color: white;
  }

  span {
    font-weight: 500;
  }
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.service-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .service-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .service-content {
    flex: 1;

    h4 {
      color: var(--text-light);
      margin-bottom: 0.5rem;

      .dark-mode & {
        color: var(--text-dark);
      }
    }

    p {
      color: var(--text-secondary-light);
      font-size: 0.875rem;
      line-height: 1.5;

      .dark-mode & {
        color: var(--text-secondary-dark);
      }
    }
  }
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  overflow: hidden;
  padding: 0;
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  background: transparent;
  border: none;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: var(--text-light);
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  .dark-mode & {
    color: var(--text-dark);
  }

  &:hover {
    background: var(--bg-secondary-light);

    .dark-mode & {
      background: var(--bg-secondary-dark);
    }
  }

  &.active {
    color: var(--primary-color);
  }

  svg {
    transition: transform 0.3s ease;

    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;

  &.active {
    max-height: 200px;
  }

  p {
    padding: 0 1.5rem 1.5rem;
    color: var(--text-secondary-light);
    line-height: 1.6;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}
</style> 