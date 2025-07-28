<template>
  <div class="about">
    <div class="container">
      <!-- 个人介绍 -->
      <section class="intro section">
        <div class="intro-content">
          <div class="intro-text">
            <h1 class="page-title fade-in-up">{{ $t('about.title') }}</h1>
            <p class="intro-description fade-in-up">
              我是一名充满激情的全栈开发工程师，拥有5年的Web开发经验。
              专注于现代前端技术栈，包括Vue.js、React、TypeScript等，
              同时也熟悉后端开发和数据库设计。我热爱学习新技术，
              致力于创造优秀的用户体验和高质量的代码。
            </p>
            <div class="intro-stats">
              <div class="stat-item">
                <span class="stat-number">5+</span>
                <span class="stat-label">年开发经验</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">完成项目</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">20+</span>
                <span class="stat-label">技术栈</span>
              </div>
            </div>
          </div>
          <div class="intro-image">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face" alt="关于我" />
          </div>
        </div>
      </section>

      <!-- 专业技能 -->
      <section class="skills-detail section">
        <h2 class="section-title">专业技能</h2>
        <div class="skills-categories">
          <div v-for="category in skillCategories" :key="category.name" class="skill-category card">
            <h3>{{ category.name }}</h3>
            <div class="skills-list">
              <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 工作经历 -->
      <section class="experience section">
        <h2 class="section-title">工作经历</h2>
        <div class="timeline">
          <div v-for="(job, index) in workExperience" :key="index" class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content card">
              <div class="job-header">
                <h3>{{ job.position }}</h3>
                <span class="job-company">{{ job.company }}</span>
              </div>
              <div class="job-period">{{ job.period }}</div>
              <p class="job-description">{{ job.description }}</p>
              <div class="job-achievements">
                <h4>主要成就：</h4>
                <ul>
                  <li v-for="achievement in job.achievements" :key="achievement">
                    {{ achievement }}
                  </li>
                </ul>
              </div>
              <div class="job-technologies">
                <span v-for="tech in job.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 教育背景 -->
      <section class="education section">
        <h2 class="section-title">教育背景</h2>
        <div class="education-grid">
          <div v-for="edu in education" :key="edu.school" class="education-card card">
            <div class="education-icon">🎓</div>
            <h3>{{ edu.degree }}</h3>
            <p class="education-school">{{ edu.school }}</p>
            <p class="education-period">{{ edu.period }}</p>
            <p class="education-description">{{ edu.description }}</p>
          </div>
        </div>
      </section>

      <!-- 证书认证 -->
      <section class="certifications section">
        <h2 class="section-title">证书认证</h2>
        <div class="certifications-grid">
          <div v-for="cert in certifications" :key="cert.name" class="certification-card card">
            <div class="cert-icon">🏆</div>
            <h3>{{ cert.name }}</h3>
            <p class="cert-issuer">{{ cert.issuer }}</p>
            <p class="cert-date">{{ cert.date }}</p>
            <a v-if="cert.link" :href="cert.link" target="_blank" class="cert-link">
              查看证书
            </a>
          </div>
        </div>
      </section>

      <!-- 兴趣爱好 -->
      <section class="interests section">
        <h2 class="section-title">兴趣爱好</h2>
        <div class="interests-grid">
          <div v-for="interest in interests" :key="interest.name" class="interest-item">
            <div class="interest-icon">{{ interest.icon }}</div>
            <h3>{{ interest.name }}</h3>
            <p>{{ interest.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const skillCategories = ref([
  {
    name: '前端技术',
    skills: [
      { name: 'Vue.js', level: 95 },
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'JavaScript', level: 95 },
      { name: 'HTML/CSS', level: 92 },
      { name: 'Sass/Less', level: 85 }
    ]
  },
  {
    name: '后端技术',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Express.js', level: 82 },
      { name: 'MongoDB', level: 78 },
      { name: 'MySQL', level: 75 },
      { name: 'Redis', level: 70 }
    ]
  },
  {
    name: '工具与部署',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'Webpack', level: 85 },
      { name: 'Vite', level: 88 },
      { name: 'AWS', level: 70 },
      { name: 'Nginx', level: 72 }
    ]
  }
])

const workExperience = ref([
  {
    position: '高级前端工程师',
    company: '科技有限公司',
    period: '2022.03 - 至今',
    description: '负责公司核心产品的前端架构设计和开发，带领团队完成多个重要项目。',
    achievements: [
      '主导重构公司主要产品，性能提升40%',
      '建立前端开发规范和组件库',
      '指导初级开发者，提升团队整体技术水平',
      '引入新技术栈，提高开发效率'
    ],
    technologies: ['Vue.js', 'TypeScript', 'Element Plus', 'Pinia']
  },
  {
    position: '前端工程师',
    company: '互联网公司',
    period: '2020.06 - 2022.02',
    description: '参与多个Web应用的开发，负责用户界面设计和交互实现。',
    achievements: [
      '完成15+个项目的前端开发',
      '优化页面加载速度，提升用户体验',
      '实现响应式设计，适配多端设备',
      '与后端团队协作，完成API对接'
    ],
    technologies: ['React', 'JavaScript', 'Ant Design', 'Redux']
  },
  {
    position: '初级前端开发',
    company: '创业公司',
    period: '2019.03 - 2020.05',
    description: '作为前端开发新人，学习并实践现代前端开发技术。',
    achievements: [
      '快速掌握Vue.js框架',
      '完成公司官网和管理后台开发',
      '学习并应用最佳实践',
      '积极参与代码review和技术分享'
    ],
    technologies: ['Vue.js', 'JavaScript', 'Bootstrap', 'jQuery']
  }
])

const education = ref([
  {
    degree: '计算机科学与技术 学士',
    school: '某某大学',
    period: '2015 - 2019',
    description: '主修计算机科学与技术，学习了数据结构、算法、数据库、网络等基础课程。'
  }
])

const certifications = ref([
  {
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: '2023.08',
    link: 'https://aws.amazon.com'
  },
  {
    name: 'Vue.js 认证开发者',
    issuer: 'Vue.js 官方',
    date: '2022.12',
    link: 'https://vuejs.org'
  },
  {
    name: '前端工程师认证',
    issuer: '某某认证机构',
    date: '2021.06',
    link: ''
  }
])

const interests = ref([
  {
    name: '开源贡献',
    icon: '💻',
    description: '积极参与开源项目，为社区贡献代码'
  },
  {
    name: '技术写作',
    icon: '✍️',
    description: '喜欢分享技术心得，撰写技术博客'
  },
  {
    name: '摄影',
    icon: '📸',
    description: '用镜头记录生活中的美好瞬间'
  },
  {
    name: '旅行',
    icon: '🌍',
    description: '探索不同的文化，开阔视野'
  }
])
</script>

<style lang="scss" scoped>
.about {
  padding-top: var(--nav-height);
}

.page-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);

  @include respond-to('md') {
    font-size: 3.5rem;
  }
}

.intro-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  @include respond-to('lg') {
    grid-template-columns: 2fr 1fr;
  }
}

.intro-description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-secondary-light);
  margin-bottom: 2rem;

  .dark-mode & {
    color: var(--text-secondary-dark);
  }
}

.intro-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;

  .stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: var(--text-secondary-light);
    font-size: 0.875rem;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.intro-image {
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-light);

    .dark-mode & {
      box-shadow: var(--shadow-dark);
    }
  }
}

.skills-categories {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.skill-category {
  h3 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.skill-item {
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  .skill-name {
    font-weight: 500;
    color: var(--text-light);

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  .skill-level {
    font-size: 0.875rem;
    color: var(--text-secondary-light);

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.skill-bar {
  height: 8px;
  background: var(--bg-secondary-light);
  border-radius: 4px;
  overflow: hidden;

  .dark-mode & {
    background: var(--bg-secondary-dark);
  }
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 4px;
  transition: width 1s ease;
}

.timeline {
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--primary-color);
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 1rem;
  width: 12px;
  height: 12px;
  background: var(--primary-color);
  border-radius: 50%;
  border: 3px solid var(--bg-light);

  .dark-mode & {
    border-color: var(--bg-dark);
  }
}

.timeline-content {
  margin-left: 1rem;
}

.job-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @include respond-to('sm') {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  h3 {
    color: var(--text-light);
    margin: 0;

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  .job-company {
    color: var(--primary-color);
    font-weight: 500;
  }
}

.job-period {
  color: var(--text-secondary-light);
  font-size: 0.875rem;
  margin-bottom: 1rem;

  .dark-mode & {
    color: var(--text-secondary-dark);
  }
}

.job-description {
  color: var(--text-secondary-light);
  line-height: 1.6;
  margin-bottom: 1.5rem;

  .dark-mode & {
    color: var(--text-secondary-dark);
  }
}

.job-achievements {
  margin-bottom: 1.5rem;

  h4 {
    color: var(--text-light);
    font-size: 1rem;
    margin-bottom: 0.5rem;

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-secondary-light);

      .dark-mode & {
        color: var(--text-secondary-dark);
      }

      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: var(--primary-color);
      }
    }
  }
}

.job-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: var(--primary-color);
  color: white;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.education-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }
}

.education-card {
  text-align: center;

  .education-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: var(--text-light);
    margin-bottom: 0.5rem;

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  .education-school {
    color: var(--primary-color);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .education-period {
    color: var(--text-secondary-light);
    font-size: 0.875rem;
    margin-bottom: 1rem;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }

  .education-description {
    color: var(--text-secondary-light);
    line-height: 1.6;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.certifications-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.certification-card {
  text-align: center;

  .cert-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: var(--text-light);
    margin-bottom: 0.5rem;

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  .cert-issuer {
    color: var(--primary-color);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .cert-date {
    color: var(--text-secondary-light);
    font-size: 0.875rem;
    margin-bottom: 1rem;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }

  .cert-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: var(--primary-dark);
    }
  }
}

.interests-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(4, 1fr);
  }
}

.interest-item {
  text-align: center;
  padding: 2rem;
  border-radius: var(--border-radius);
  background: var(--bg-secondary-light);
  transition: all 0.3s ease;

  .dark-mode & {
    background: var(--bg-secondary-dark);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-light);

    .dark-mode & {
      box-shadow: var(--shadow-dark);
    }
  }

  .interest-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: var(--text-light);
    margin-bottom: 0.5rem;

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  p {
    color: var(--text-secondary-light);
    font-size: 0.875rem;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}
</style> 