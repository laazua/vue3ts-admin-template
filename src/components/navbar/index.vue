<template>
  <div class="navbar">
    <div class="left">
      <!-- 折叠按钮 -->
      <el-button
        class="collapse-btn"
        text
        @click="appStore.toggleCollapse"
      >
        <el-icon>
          <component :is="appStore.isCollapse ? Expand : Fold" />
        </el-icon>
      </el-button>

      <span class="logo">
        vue3ts-admin-template
      </span>
    </div>

    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.userInfo?.name || '用户' }}
          <i class="el-icon-arrow-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import { Fold, Expand } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore() as any
const appStore = useAppStore()

const logout = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background: #304156;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
}

.left {
  display: flex;
  align-items: center;
}

.logo {
  font-weight: bold;
  color: #fff;
  margin-left: 12px;
}

.collapse-btn {
  color: #fff;
  font-size: 20px;
}

.el-dropdown-link {
  color: #fff;
}
</style>
