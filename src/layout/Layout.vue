<template>
  <div class="layout-container">
    <!-- 顶部导航栏 -->
    <NavBar class="navbar" />

    <!-- 侧边栏 + main区域 -->
    <div class="body-container">
      <SiderBar class="siderbar" />
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

</script>

<style scoped>

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
  width: 200px;
  background: #304156;
  overflow-y: auto;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-zone {
  flex: 1;
  overflow-y: auto;
  background: #f5f7fa;
  padding: 16px;
}

</style>