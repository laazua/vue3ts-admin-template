<template>
  <el-menu
    class="siderbar"
    router
    :unique-opened="true"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
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
import type { AppRouteRecordRaw } from "@/type/comm"

const routes = ref<AppRouteRecordRaw[]>([])

onMounted(async () => {
  const userStore = useUserStore()
  routes.value = await userStore.getMenuRoutes()
  // console.log('加载后的路由', routes.value)
})
</script>
