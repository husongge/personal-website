<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="nav-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <span>Portfolio</span>
        </router-link>

        <!-- 桌面导航 -->
        <div class="nav-links desktop-nav">
          <router-link 
            v-for="item in navItems" 
            :key="item.name"
            :to="item.path"
            class="nav-link"
            :class="{ active: $route.path === item.path }"
          >
            {{ $t(item.label) }}
          </router-link>
        </div>

        <!-- 工具栏 -->
        <div class="nav-tools">
          <!-- 语言切换 -->
          <button @click="toggleLanguage" class="tool-btn" :title="$t('nav.language')">
            {{ currentLocale === 'zh' ? 'EN' : '中' }}
          </button>
          
          <!-- 主题切换 -->
          <button @click="toggleTheme" class="tool-btn" :title="$t('nav.theme')">
            <svg v-if="!isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
            </svg>
          </button>

          <!-- 移动端菜单按钮 -->
          <button @click="toggleMobileMenu" class="mobile-menu-btn" :class="{ active: isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <!-- 移动端导航 -->
      <div class="mobile-nav" :class="{ active: isMobileMenuOpen }">
        <router-link 
          v-for="item in navItems" 
          :key="item.name"
          :to="item.path"
          class="mobile-nav-link"
          @click="closeMobileMenu"
        >
          {{ $t(item.label) }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'

const { locale, t } = useI18n()
const themeStore = useThemeStore()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const currentLocale = ref(locale.value)

const navItems = [
  { name: 'home', path: '/', label: 'nav.home' },
  { name: 'about', path: '/about', label: 'nav.about' },
  { name: 'portfolio', path: '/portfolio', label: 'nav.portfolio' },
  { name: 'blog', path: '/blog', label: 'nav.blog' },
  { name: 'contact', path: '/contact', label: 'nav.contact' }
]

const isDarkMode = computed(() => themeStore.isDarkMode)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleLanguage = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  locale.value = newLocale
  currentLocale.value = newLocale
  localStorage.setItem('locale', newLocale)
}

const toggleTheme = () => {
  themeStore.toggleDarkMode()
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // 恢复语言设置
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    locale.value = savedLocale
    currentLocale.value = savedLocale
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-light);
  z-index: 1000;
  transition: all 0.3s ease;

  .dark-mode & {
    background: rgba(26, 26, 26, 0.9);
    border-bottom-color: var(--border-dark);
  }

  &.scrolled {
    box-shadow: var(--shadow-light);
    
    .dark-mode & {
      box-shadow: var(--shadow-dark);
    }
  }
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.desktop-nav {
  display: none;
  gap: 2rem;

  @include respond-to('md') {
    display: flex;
  }
}

.nav-link {
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;

  .dark-mode & {
    color: var(--text-dark);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }

  &:hover,
  &.active {
    color: var(--primary-color);

    &::after {
      width: 100%;
    }
  }
}

.nav-tools {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.tool-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.3s ease;

  .dark-mode & {
    color: var(--text-dark);
  }

  &:hover {
    background: var(--bg-secondary-light);
    transform: scale(1.1);

    .dark-mode & {
      background: var(--bg-secondary-dark);
    }
  }
}

.mobile-menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  @include respond-to('md') {
    display: none;
  }

  span {
    display: block;
    height: 2px;
    width: 100%;
    background: var(--text-light);
    margin: 3px 0;
    transition: all 0.3s ease;

    .dark-mode & {
      background: var(--text-dark);
    }
  }

  &.active {
    span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    span:nth-child(2) {
      opacity: 0;
    }
    
    span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-light);
  border-bottom: 1px solid var(--border-light);
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  .dark-mode & {
    background: var(--bg-dark);
    border-bottom-color: var(--border-dark);
  }

  &.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  @include respond-to('md') {
    display: none;
  }
}

.mobile-nav-link {
  padding: 1rem 1.5rem;
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid var(--border-light);
  transition: all 0.3s ease;

  .dark-mode & {
    color: var(--text-dark);
    border-bottom-color: var(--border-dark);
  }

  &:hover {
    background: var(--bg-secondary-light);
    color: var(--primary-color);

    .dark-mode & {
      background: var(--bg-secondary-dark);
    }
  }

  &:last-child {
    border-bottom: none;
  }
}
</style> 