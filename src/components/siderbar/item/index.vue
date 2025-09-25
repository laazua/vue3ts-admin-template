<template>
  <!-- 如果只有一个子节点，直接显示为 el-menu-item -->
  <el-menu-item v-if="item.children?.length === 1" :index="fullPath">
    <el-icon v-if="item.children[0].meta?.icon">
      <component :is="item.children[0].meta.icon" />
    </el-icon>
    <span>{{ item.children[0].meta?.title || item.children[0].name }}</span>
  </el-menu-item>

  <!-- 多个子节点才显示为可展开菜单 -->
  <el-sub-menu
    v-else-if="item.children && item.children.length > 1"
    :index="fullPath"
  >
    <template #title>
      <el-icon v-if="item.meta?.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta?.title || item.name }}</span>
    </template>

    <Item
      v-for="child in item.children"
      :key="child.path || child.name"
      :item="child"
      :parent-path="fullPath"
    />
  </el-sub-menu>

  <!-- 叶子节点 -->
  <el-menu-item v-else :index="fullPath">
    <el-icon v-if="item.meta?.icon">
      <component :is="item.meta.icon" />
    </el-icon>
    <span>{{ item.meta?.title || item.name }}</span>
  </el-menu-item>
  
</template>

<script lang="ts" setup>

import { computed } from "vue"
import Item from "./index.vue"


const props = defineProps({
  item: { type: Object, required: true },
  parentPath: { type: String, default: "" }
})

const fullPath = computed(() => {
    if (!props.item.path)  return props.parentPath
    // if (props.item.path.startsWith('/')) return props.item.path
    return (props.parentPath + '/' + props.item.path).replace(/\/+/g, "/")
})

</script>

<style scoped>

</style>