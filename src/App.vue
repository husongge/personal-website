<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <NavBar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'

const themeStore = useThemeStore()
const isDarkMode = ref(false)

onMounted(() => {
  // 检查本地存储的主题设置
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
    themeStore.setDarkMode(true)
  }
})

// 监听主题变化
themeStore.$subscribe((mutation, state) => {
  isDarkMode.value = state.isDarkMode
  localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light')
})
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  transition: all 0.3s ease;
  
  &.dark-mode {
    background-color: var(--bg-dark);
    color: var(--text-dark);
  }
}

main {
  flex: 1;
}
</style> 