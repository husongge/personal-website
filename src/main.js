import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import './styles/main.scss'

// 国际化配置
const messages = {
  zh: {
    nav: {
      home: '首页',
      about: '关于我',
      portfolio: '项目展示',
      blog: '博客',
      contact: '联系方式'
    },
    hero: {
      title: '你好，我是',
      name: '张三',
      subtitle: '全栈开发工程师',
      description: '专注于现代Web技术，致力于创造优秀的用户体验'
    },
    about: {
      title: '关于我',
      intro: '我是一名充满激情的全栈开发工程师...'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact'
    },
    hero: {
      title: 'Hello, I am',
      name: 'Zhang San',
      subtitle: 'Full Stack Developer',
      description: 'Focused on modern web technologies, committed to creating excellent user experiences'
    },
    about: {
      title: 'About Me',
      intro: 'I am a passionate full-stack developer...'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app') 