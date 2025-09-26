<template>
  <el-menu
    class="siderbar-menu"
    router
    :unique-opened="true"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    background-color="#304156"
    :collapse="appStore.isCollapse"
  >
    <Item
      v-for="(item, index) in routes"
      :key="item.path ?? item.name ?? index"
      :item="item"
    />
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Item from '@/components/siderbar/item'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import type { AppRouteRecordRaw } from "@/type/comm"

const routes = ref<AppRouteRecordRaw[]>([])
const appStore = useAppStore()

onMounted(async () => {
  const userStore = useUserStore()
  routes.value = await userStore.getMenuRoutes()
})
</script>

<style scoped>
.siderbar-menu {
  border-right: none;
  height: 100%;
  background-color: #304156 !important;
}
</style>
