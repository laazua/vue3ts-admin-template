<template>
  <!-- 单一子节点 -->
  <el-menu-item v-if="item.children?.length === 1" :index="fullPath">
    <el-icon v-if="item.children[0].meta?.icon">
      <component :is="resolveIcon(item.children[0].meta.icon)" />
    </el-icon>
    <span>{{ item.children[0].meta?.title || item.children[0].name }}</span>
  </el-menu-item>

  <!-- 多个子节点 (父级 + 子级) -->
  <el-sub-menu
    v-else-if="item.children && item.children.length > 1"
    :index="fullPath"
  >
    <template #title>
      <!-- ✅ 父级菜单图标 -->
      <el-icon v-if="item.meta?.icon">
        <component :is="resolveIcon(item.meta.icon)" />
      </el-icon>
      <span>{{ item.meta?.title || item.name }}</span>
    </template>

    <!-- 渲染子菜单 -->
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
      <component :is="resolveIcon(item.meta.icon)" />
    </el-icon>
    <span>{{ item.meta?.title || item.name }}</span>
  </el-menu-item>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import Item from "./index.vue"

const props = defineProps({
  item: { type: Object, required: true },
  parentPath: { type: String, default: "" }
})

/**
 * 拼接路径，避免 / 重复
 */
const fullPath = computed(() => {
  if (!props.item.path) return props.parentPath
  return (props.parentPath + "/" + props.item.path).replace(/\/+/g, "/")
})

/**
 * 解析 icon
 * - 支持传入组件
 * - 支持传入字符串（会去 @element-plus/icons-vue 自动映射）
 */
const resolveIcon = (icon: any) => {
  if (!icon) return null
  if (typeof icon === "string") {
    return (ElementPlusIconsVue as any)[icon] || null
  }
  return icon
}
</script>
