import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useAppStore = defineStore('app', () => {
  const isCollapse = ref(false)
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }
  return { isCollapse, toggleCollapse }
})
