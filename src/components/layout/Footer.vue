<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- 个人信息 -->
        <div class="footer-section">
          <h3>{{ $t('hero.name') }}</h3>
          <p>{{ $t('hero.subtitle') }}</p>
          <div class="social-links">
            <a href="https://github.com" target="_blank" rel="noopener" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div class="footer-section">
          <h4>快速链接</h4>
          <ul class="footer-links">
            <li><router-link to="/">{{ $t('nav.home') }}</router-link></li>
            <li><router-link to="/about">{{ $t('nav.about') }}</router-link></li>
            <li><router-link to="/portfolio">{{ $t('nav.portfolio') }}</router-link></li>
            <li><router-link to="/blog">{{ $t('nav.blog') }}</router-link></li>
          </ul>
        </div>

        <!-- 联系信息 -->
        <div class="footer-section">
          <h4>联系方式</h4>
          <div class="contact-info">
            <p>📧 your.email@example.com</p>
            <p>📱 +86 123 4567 8900</p>
            <p>📍 中国 · 北京</p>
          </div>
        </div>

        <!-- 技能标签 -->
        <div class="footer-section">
          <h4>技能标签</h4>
          <div class="skill-tags">
            <span class="skill-tag">Vue.js</span>
            <span class="skill-tag">React</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">TypeScript</span>
            <span class="skill-tag">Python</span>
          </div>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="footer-bottom">
        <div class="copyright">
          <p>&copy; 2024 {{ $t('hero.name') }}. All Rights Reserved.</p>
        </div>
        <div class="footer-meta">
          <span>Built with Vue.js</span>
          <span>•</span>
          <span>Hosted on Vercel</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.footer {
  background: var(--bg-secondary-light);
  border-top: 1px solid var(--border-light);
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @include respond-to('sm') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(4, 1fr);
  }
}

.footer-section {
  h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  h4 {
    color: var(--text-light);
    margin-bottom: 1rem;
    font-size: 1.1rem;

    .dark-mode & {
      color: var(--text-dark);
    }
  }

  p {
    color: var(--text-secondary-light);
    margin-bottom: 0.5rem;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--bg-light);
  color: var(--text-secondary-light);
  border: 1px solid var(--border-light);
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(9, 105, 218, 0.1);
  }
}

.footer-links {
  list-style: none;

  li {
    margin-bottom: 0.5rem;

    a {
      color: var(--text-secondary-light);
      text-decoration: none;
      transition: color 0.3s ease;

      .dark-mode & {
        color: var(--text-secondary-dark);
      }

      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

.contact-info {
  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 4px 8px;
  background: var(--bg-secondary-light);
  border: 1px solid var(--border-light);
  color: var(--text-secondary-light);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    transform: translateY(-1px);
  }
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
  gap: 1rem;

  .dark-mode & {
    border-top-color: var(--border-dark);
  }

  @include respond-to('md') {
    flex-direction: row;
    gap: 0;
  }
}

.copyright {
  p {
    color: var(--text-secondary-light);
    font-size: 0.875rem;

    .dark-mode & {
      color: var(--text-secondary-dark);
    }
  }
}

.footer-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary-light);
  font-size: 0.875rem;

  .dark-mode & {
    color: var(--text-secondary-dark);
  }
}
</style> 