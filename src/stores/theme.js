import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false)

  const setDarkMode = (value) => {
    isDarkMode.value = value
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  return {
    isDarkMode,
    setDarkMode,
    toggleDarkMode
  }
}) 