<template>
  <div class="layout-container">
    <!-- 顶部导航栏 -->
    <NavBar class="navbar" />

    <!-- 侧边栏 + main区域 -->
    <div class="body-container">
      <!-- 侧边栏 -->
      <transition name="sidebar">
        <div
          class="siderbar"
          :style="{ width: appStore.isCollapse ? '64px' : '200px' }"
          key="sidebar"
        >
          <SiderBar />
        </div>
      </transition>

      <!-- 主体部分 -->
      <div class="main-container">
        <MainApp class="main-zone" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '@/components/navbar'
import SiderBar from '@/components/siderbar'
import MainApp from '@/components/main'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>

<style scoped>

:global(body) {
  margin: 0;
  height: 100%;
}

.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.navbar {
  height: 50px;
  flex-shrink: 0;
  border-bottom: 1px solid #eee;
  background: #304156;
}

.body-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.siderbar {
  background: #304156;
  overflow-y: auto;
  transition: width 0.3s ease;
  height: 100%;
}

/* 过渡动画定义 */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.3s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
}

.main-zone {
  flex: 1;
  overflow-y: auto;
  background: #f5f7fa;
  padding: 16px;
  overflow: hidden;
}
</style>
